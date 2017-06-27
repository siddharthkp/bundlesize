const pass = () => {} // noop
const fail = () => process.exit(1)
const error = () => process.exit(1)

module.exports = { pass, fail, error }
