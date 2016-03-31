/**
 * Created by mike on 1/26/2015.
 */
'use strict';

var EventEmitter = require('events'); // to catch server issues ..
var ee = EventEmitter.EventEmitter();

var express = require('express');
var bodyParser = require('body-parser');

var app = module.exports.app = exports.app = express();

app.use(bodyParser.json());

// our logic ...
// jscs: disable
var config = require('./config');
var _ = require('lodash');
var logging = config.logging;
var expressJson = require('express-json');
var urlencoded = require('urlencoded-request-parser');
var request = require('request');

var fs = require('fs');

var server = require('http').createServer(app);
server.timeout = 0;

var mockFileRoot = config.data_location;

// CONFIG SERVER

var oneHour = 86400000 / 24;

//allows server to run as proxy
app.enable('trust proxy');

// body parser replaced , as was deprecated in connect 3
// SO WE DONT PARSE BODY
app.use(expressJson());
app.use(urlencoded());

//serve the "compiled" build folder
app.use(express.static(config.static_site_root,
  {
    maxAge: oneHour
  }
));

// DEFINE ENDPOINTS

var logger = function(item) {
  if (!logging) {
    return;
  }
  var now = new Date();
  var message = now + ': ' + item + '\n';
  fs.appendFile('localServerLog.txt', message);
};
logger('Will serve static from ' + config.static_site_root);

/**
 * @private
 * @param root - splitPath[0] of the req object
 * @param reqQuery - looks at ?arg=
 * and changes the url to the mapped route, with the argument
 * so we can mock it
 * if qArg not found, we return same route
 * @returns {string}
 */
var makeMockPath = function(root, reqQuery) {


  //default is mockFileRoot + splitPath[0];

  console.log('root> ' + JSON.stringify(root));
  console.log('reqQuery> ' + JSON.stringify(reqQuery));

  if (reqQuery.validate === '') {
    return mockFileRoot + '/validation';
  }
  if (reqQuery.rate === '') {
    return mockFileRoot + '/premium';
  }
  return mockFileRoot + root;
};

/**
 * Private fn to return from a file
 * @constructor
 */
var postOrPut = function(req, res) {
  logger('start post');
  var endpoint;
  var splitPath = req.params[0].split("/");

  var reqQuery = req.query;
  logger('req query: >>' + JSON.stringify(reqQuery));
  logger('req params: >>' + JSON.stringify(req.params));

  var mockPath = makeMockPath(splitPath[0], reqQuery);//mockFileRoot +
                                                      // splitPath[0];
  var mockResponse;

  if (splitPath.length > 2) {
    endpoint = splitPath[splitPath.length - 2];
  }

  logger(endpoint + ' ' + req.params[0] + ' ' + splitPath);

  if (splitPath[1]) {
    endpoint = splitPath[1]
  } else {
    endpoint = 'default'
  }

  try {
    mockResponse =
      JSON.parse(fs.readFileSync(mockPath + '/' + endpoint + '.json'));
    // Change the second parameter in this function to a time in milliseconds
    // to mock network latency on http requests
    res.send(200, mockResponse);
  }
  catch (err) {
    logger(err);
    res.send(500);
  }
};

// for gets == get json file from /data directory
function Get(req, res) {
  var endpoint,
      splitPath = req.params[0].split("/"),
      mockPath  = mockFileRoot + splitPath[0],
      mockResponse;

  if (splitPath.length > 2) {
    endpoint = splitPath[splitPath.length - 2];
  }

  logger(endpoint + ': ' + req.params[0] + ': ' + splitPath);

  if (splitPath[1]) {
    endpoint = splitPath[1]
  } else {
    endpoint = 'default'
  }

  try {
    mockResponse =
      JSON.parse(fs.readFileSync(mockPath + '/' + endpoint + '.json'));
    // Change the second parameter in this function to a time in milliseconds
    // to mock network latency on http requests
    res.send(200, mockResponse);
  }
  catch (err) {
    logger(err);
    res.send(500);
  }
}

// for gets == get json file from /data directory
app.get(config.rest_base_url, function(req, res) {
  try {
    logger('getting>' + JSON.stringify(req.params));
    Get(req, res);
  }
  catch (e) {
    logger('server error - get: ' + e);
    ee.emit('clientError', e);
  }

});

// for posts
app.post(config.rest_base_url, function(req, res) {
  try {
    postOrPut(req, res);
  }
  catch (e) {
    logger('server error - Post: ' + e);
    ee.emit('clientError', e);
  }

});

//for puts
app.put(config.rest_base_url, function(req, res) {
  try {
    logger('Put returns dupe');
    res.send(200, req.body);
  }
  catch (e) {
    logger('server error - Put: ' + e);
    ee.emit('clientError', e);
  }

});

// FIRE IT UP
server.on('clientError', function(exception, socket) {
  logger('server error: ' + exception);
});
server.on('close', function() {
  logger('connection closed');
});
server.listen(process.env.PORT || config.port, function() {
  logger("Express server listening on port " + config.port);
});



