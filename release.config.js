module.exports = {
  branches: [
    { name: "main" },
    { name: "staging", channel: "pre/rc", prerelease: "rc" }, // `prerelease` is built with the template `${name.replace(/^pre\\//g, "")}`
    { name: "beta", channel: "beta", prerelease: true }, // `prerelease` is set to `beta` as it is the value of `name`
  ],
  npmPublish: false,
  dryRun: false,
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
    "@semantic-release/github",
  ],
};
