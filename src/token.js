const token =
  process.env.bundlesize_github_token ||
  process.env.BUNDLESIZE_GITHUB_TOKEN ||
  process.env.github_token ||
  process.env.GITHUB_TOKEN

module.exports = token
