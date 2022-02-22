const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: './', })

module.exports = createJestConfig({
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "^@components(.*)$": "<rootDir>/src/components$1",
    "^@lib(.*)$": "<rootDir>/src/lib$1",
    "^@common(.*)$": "<rootDir>/src/common$1",
    "^@mocks(.*)$": "<rootDir>/src/mocks$1",
    "^@auth(.*)$": "<rootDir>/src/auth$1",
    "\\.css$": "<rootDir>/src/mocks/cssMock.ts",
    "\\/mocks/index$": "<rootDir>/src/mocks/mswMock.ts",
  },
  testEnvironment: 'jest-environment-jsdom',
  modulePathIgnorePatterns: ["<rootDir>/cypress/"],
})
