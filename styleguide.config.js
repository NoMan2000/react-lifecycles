const path = require('path');

module.exports = {
  ignore: [
    '**/__tests__/**',
    '**/*.test.js',
    '**/*.spec.js',
    '**/__mocks__/**'
  ],
  getExampleFilename(componentPath) {
    // Stops it from loading readme.md files.
    return componentPath.replace(/\.jsx?$/, '.md');
  },
  skipComponentsWithoutExample: true,
  serverPort: process.env.STYLEGUIDE_PORT || 6060,
  components: path.join(__dirname, 'src/**/*.js'),
  configureServer(app) {
    // Makes all requests proxy the mock server if they can't be found.
    const mockServer = require('./mockServer/server.js');
    app.use(mockServer);
  }
};
