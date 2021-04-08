module.exports = {
  globalSetup: '<rootDir>/dotenv/dotenvTest.js',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
	moduleNameMapper: {
		'^@components(.*)$': '<rootDir>/src/components$1',
		'^@lib(.*)$': '<rootDir>/src/lib$1',
		'^@state(.*)$': '<rootDir>/src/state$1',
		'^@common(.*)$': '<rootDir>/src/common$1',
		'^@mocks(.*)$': '<rootDir>/src/mocks$1',
	},
}
