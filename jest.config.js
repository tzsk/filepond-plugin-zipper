module.exports = {
  clearMocks: true,

  collectCoverage: true,

  collectCoverageFrom: [
    './src/**/*.ts',
    '!./**/*.{test,spec}.ts',
    '!./dist/**/*.[jt]s',
  ],

  coverageDirectory: 'coverage',

  testEnvironment: 'jsdom',

  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],

  testMatch: [
    '**/tests/?(*.)+(spec|test).[tj]s?(x)',
  ],

  testPathIgnorePatterns: [
    '/node_modules/',
  ],

  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
};
