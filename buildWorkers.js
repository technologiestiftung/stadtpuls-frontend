const envVars = require('dotenv').config();

require('esbuild').build({
  entryPoints: ["./workers/downloadQueue.worker.ts"],
  outfile: "./public/workers/downloadQueueWorker.js",
  bundle: true,
  define: Object.keys(envVars.parsed).reduce(
    (acc, key) => Object.assign(
      {},
      acc,
      {
        [`process.env.${key}`]: `"${envVars.parsed[key]}"`
      }
    ), {}),
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
    process.exisst(1)
  });
