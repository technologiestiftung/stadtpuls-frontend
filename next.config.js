const withMdxEnhanced = require('next-mdx-enhanced')

module.exports = withMdxEnhanced({
  layoutPath: 'src/components/layouts',
  defaultLayout: true,
  fileExtensions: ['mdx'],
  remarkPlugins: [
    require('remark-slug'),
  ],
  rehypePlugins: [],
  usesSrc: false,
  extendFrontMatter: {
    process: (mdxContent, frontMatter) => {},
    phase: 'prebuild|loader|both',
  },
  reExportDataFetching: false,
})();
