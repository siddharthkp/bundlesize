const readStream = stream => {
  return new Promise(resolve => {
    let data = ''
    stream.on('readable', () => {
      const chunk = stream.read()
      data += chunk
    })
    stream.on('end', () => resolve(data))
  })
}

module.exports = readStream
