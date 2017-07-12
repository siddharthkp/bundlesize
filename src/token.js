const token =
  process.env.github_token ||
  process.env.GITHUB_TOKEN ||
  process.env.bundlesize_github_token ||
  process.env.BUNDLESIZE_GITHUB_TOKEN

module.exports = token
