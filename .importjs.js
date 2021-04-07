module.exports = {
	moduleNameFormatter({ pathToImportedModule }) {
		return pathToImportedModule
			.replace('./src/components/', '@components/')
			.replace('./src/common/', '@common/')
			.replace('./src/state/', '@state/')
			.replace('./src/lib/', '@lib/')
			.replace('./src/mocks/', '@mocks/')
			.replace(/\.ts$/gs, '')
	},
}
