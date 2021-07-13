const withMdxEnhanced = require("next-mdx-enhanced");

module.exports = withMdxEnhanced({
  layoutPath: "src/components/layouts",
  defaultLayout: true,
  fileExtensions: ["mdx"],
  remarkPlugins: [require("remark-slug")],
  rehypePlugins: [],
  usesSrc: false,
  extendFrontMatter: {
    process: (mdxContent, frontMatter) => {},
    phase: "prebuild|loader|both",
  },
  reExportDataFetching: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              // script-src and style-src are currently commented out because both values fallback to default-src
              `default-src 'self'`,
              //`script-src 'self'`,
              `connect-src 'self' ${process.env.NEXT_PUBLIC_TOKEN_API_URL} ${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
              //`style-src 'self'`,
            ].join("; "),
          },
        ],
      },
    ];
  },
})();
