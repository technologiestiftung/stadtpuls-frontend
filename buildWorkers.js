require('dotenv').config();

require('esbuild').build({
  entryPoints: ["./workers/downloadQueue.worker.ts"],
  outfile: "./public/workers/downloadQueueWorker.js",
  bundle: true,
  define: {
    'process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY': `"${process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY}"`,
    'process.env.NEXT_PUBLIC_SUPABASE_MAX_ROWS': `"${process.env.NEXT_PUBLIC_SUPABASE_MAX_ROWS}"`,
    'process.env.NEXT_PUBLIC_SUPABASE_URL': `"${process.env.NEXT_PUBLIC_SUPABASE_URL}"`,
  },
  watch: process.env.NODE_ENV === "development" ? {
    onRebuild(error, result) {
      if (error) console.error('watch build failed:', error)
      else console.log('watch build succeeded:', result)
    },
  } : false,
})
  .then(() => { console.log("Build succeeded.") })
  .catch((e) => {
    console.log("Error building:", e.message);
    process.exit(1)
  });
