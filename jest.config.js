const pkg = require('./package');

module.exports = {
  name: pkg.name,
  displayName: pkg.name,
  testEnvironment: '<rootDir>/test/environment/mongodb',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  coverageReporters: ['lcov', 'html'],
  reporters: ['default', 'jest-junit'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)?$': 'babel-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.(j|t)sx?$',
  moduleFileExtensions: ['js', 'jsx', 'css', 'ts', 'tsx', 'json'],
  collectCoverageFrom: ['src/**/*.tsx'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  moduleDirectories: ['node_modules', 'src'],
  rootDir: './',
};
