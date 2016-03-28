var wallabyWebpack = require('wallaby-webpack');

var webpackPostprocessor = wallabyWebpack({});

module.exports = function (wallaby) {
  return {
    files: [
      { pattern: "www/**/*.ts", load: false },
      { pattern: "www/**/*.tests.ts", load: false, ignore: true }
    ],

    tests: [
      { pattern: "www/**/*.tests.ts", load: false }
    ],

    postprocessor: webpackPostprocessor,

    bootstrap: function () {
      window.__moduleBundler.loadTests();
    }
  }
}
