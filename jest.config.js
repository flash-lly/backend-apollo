module.exports = {
  roots: ['<rootDir>/app'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  setupFiles: ['<rootDir>/jestEnv.js'],
};
