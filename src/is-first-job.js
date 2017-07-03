module.exports = function isFirstJob () {
  if (process.env.TRAVIS) {
    return process.env.TRAVIS_JOB_NUMBER.split('.')[1] === '1'
  } else if (process.env.APPVEYOR) {
    return process.env.APPVEYOR_JOB_NUMBER === '1'
  } else {
    return true
  }
}
