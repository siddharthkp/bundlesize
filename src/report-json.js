const fs = require('fs')

let report = false
if (process.argv.indexOf('--report-json') !== -1) report = true

const reportJson = results => {
  if(report){
    fs.writeFileSync('bundlesize-report.json', JSON.stringify(results,null,2))
  }
}

module.exports = reportJson
