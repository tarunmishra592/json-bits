module.exports = {
    testEnvironment: 'node', // Use Node.js environment for tests
    verbose: true,           // Show detailed test results
    transform: {
      '^.+\\.js$': 'babel-jest' // Use Babel for JS transformation
    }
  };
  