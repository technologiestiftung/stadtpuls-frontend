module.exports = {
	// Run type-check on changes to TypeScript files
	'**/*.(ts|js)?(x)': () => 'npm run type-check',
	// Test changes files
	'**/*.(ts|js)?(x)': () => 'npm run test',
	// Run ESLint on changes to JavaScript/TypeScript files
	'**/*.(ts|js)?(x)': (filenames) => `npm run lint-fix ${filenames.join(' ')}`,
}
