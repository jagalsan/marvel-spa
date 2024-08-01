module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
      '^@/components/(.*)$': '<rootDir>/src/components/$1',
      '^@/modules/(.*)$': '<rootDir>/src/modules/$1',
      '^@/data/(.*)$': '<rootDir>/src/data/$1',
      '^@/core/(.*)$': '<rootDir>/src/core/$1',
      '\\.(css|less|sass|scss|module.scss)$': 'identity-obj-proxy',
    },
    transform: {
      '^.+\\.(ts|tsx|js)$': 'babel-jest',
    },
  };
  