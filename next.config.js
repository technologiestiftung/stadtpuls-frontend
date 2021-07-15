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
})({
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              `default-src 'self'`,
              `script-src 'self' 'unsafe-eval'`,
              `style-src 'self' 'unsafe-inline'`,
              `font-src 'self' data:`,
              `img-src 'self' data: blob:`,
              `frame-ancestors 'none'`,
              `worker-src 'self' blob:`,
              `child-src 'self' blob:`,
              `connect-src 'self' ${process.env.NEXT_PUBLIC_TOKEN_API_URL} ${process.env.NEXT_PUBLIC_SUPABASE_URL} https://api.github.com https://api.mapbox.com https://events.mapbox.com`,
            ].join("; "),
          },
        ],
      },
    ];
  },
});
