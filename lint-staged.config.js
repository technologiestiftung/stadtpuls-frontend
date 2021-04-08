module.exports = {
	// Run ESLint on changes to JavaScript/TypeScript files
	'**/*.(ts)?(x)': (filenames) => [
		`eslint --fix ${filenames.join(' ')}`,
		`scripts/tsc-lint.sh ${filenames.join(' ')}`,
		'npm run test',
	],
}
