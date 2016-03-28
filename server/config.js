// jscs: disable
var settings = {
  port: 3000,
  logging: true,
  data_location: './data/',
  rest_base_url: '/api/*', // how to recognize REST calls
  //route_rest_base_url: '/route/api/*', // how to recognize REST calls
  static_site_root: __dirname + '/../www/build' //up a dir and find build
  //translateArgToRoute: [
  //  {arg: 'validate', route: 'validation'},
  //  {arg: 'rate', route: 'premium'}
  //]
};

module.exports = settings;
