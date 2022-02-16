const withMdxEnhanced = require("next-mdx-enhanced");
const withImages = require('next-images');

module.exports = withImages(withMdxEnhanced({
  layoutPath: "src/components/layouts",
  defaultLayout: true,
  fileExtensions: ["mdx"],
  remarkPlugins: [require("remark-slug"), require("remark-prism")],
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
              `img-src 'self' ${process.env.NEXT_PUBLIC_MATOMO_URL} https://source.boringavatars.com data: blob:`,
              `frame-ancestors 'none'`,
              `worker-src 'self' blob:`,
              `child-src 'self' blob:`,
              `connect-src 'self' ${process.env.NEXT_PUBLIC_API_URL} ${process.env.NEXT_PUBLIC_SUPABASE_URL} ${process.env.NEXT_PUBLIC_MATOMO_URL} https://api.github.com https://api.tiles.mapbox.com https://api.mapbox.com https://events.mapbox.com`,
            ].join("; "),
          },
        ],
      },
    ];
  },
}));
