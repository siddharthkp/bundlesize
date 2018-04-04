const mm = require('micromatch')
const debug = require('./debug')

/**
 * This function receives a path and a pattern (glob) and parses that path into
 * segments based on the glob pattern.
 *
 * @param  {string} path - Path to a file
 * @param  {string} pattern - Glob pattern to parse path with
 * @return {string[]} - Path segments, including any dynamic segments.
 *
 * @example
 * getPathSegments({ path: './build/main.a7584eae.js', pattern: './build/main.*.js' })
 * // returns ['./build/main.', 'a7584eae', '.js']
 *
 * @example
 * getPathSegments({ path: './build/5.832c9016.chunk.js', pattern: './build/+([0-9]).*.chunk.js' })
 * // returns ['./build/', '5', '.', '832c9016', '.chunk.js']
 */
const getPathSegments = ({ path, pattern }) => {
  // capture dynamic path segments using micromatch's capture method
  // https://github.com/micromatch/micromatch#capture
  const dynamicSegments = mm.capture(pattern, path)
  // split the path into all of it's segments using dynamic segments as a guide
  const { remainingPath, pathSegments } = dynamicSegments.reduce(
    ({ remainingPath, pathSegments }, segment, i) => {
      const startIndex = remainingPath.indexOf(segment)
      const pre = remainingPath.substr(0, startIndex)
      // capture the segment of the path immediately before the dynamic path
      // segment (if any) and append it to the pathSegments arr before appending
      // the dynamic path segment
      pathSegments = pre ? pathSegments.concat(pre) : pathSegments
      return {
        // trim the path to the index immediately following the current segment
        remainingPath: remainingPath.substr(startIndex + segment.length),
        pathSegments: pathSegments.concat(segment)
      }
    },
    {
      remainingPath: path,
      pathSegments: []
    }
  )
  // if there is still a segment remaining after the last dynamic segment, append
  // it to the end as the last path segment
  return remainingPath ? pathSegments.concat(remainingPath) : pathSegments
}

/**
 * This function attempts to dynamically map a path to it's best match on the
 * master branch (masterValues).
 * @param  {string} path - Path to a file
 * @param  {string} pattern - Glob pattern to parse path with
 * @param  {Object} masterValues - A dictionary of path/size values that represents the files on the master branch
 * @return {string|null} - If a single match is found, it is returned, otherwise null is.
 *
 * @example
 * mapPathToMaster({ path: './build/main.a7584eae.js', pattern: './build/main.*.js', masterValues: { './build/main.fd334asa.js': 10500 } })
 * // returns './build/main.fd334asa.js'
 *
 * @example
 * getPathSegments({ path: './build/5.832c9016.chunk.js', pattern: './build/+([0-9]).*.chunk.js', masterValues: { './build/5.asd32fs.chunk.js': 450 } })
 * // returns './build/5.asd32fs.chunk.js'
 *
 * @example
 * getPathSegments({
 *   path: './build/5.832c9016.chunk.js',
 *   pattern: './build/*.chunk.js',
 *   masterValues: {
 *     './build/5.asd32fs.chunk.js': 450,
 *     './build/25.kjfo232.chunk.js': 750
 *   }
 * })
 * // returns null
 */
const mapPathToMaster = ({ path, pattern, masterValues }) => {
  // get the list of path segments
  const pathSegments = getPathSegments({ path, pattern })
  // find all paths (keys in masterValues) that match the file's glob pattern
  const isMatch = mm.matcher(pattern)
  const matchingPaths = Object.keys(masterValues).filter(masterPath =>
    isMatch(masterPath)
  )
  // find partial matches (the intersection) between path segments and matching
  // file path segments
  const segmentIntersections = matchingPaths.map(matchingPath => {
    const segments = getPathSegments({ path: matchingPath, pattern })
    return {
      path: matchingPath,
      intersection: pathSegments.filter(segment => segments.includes(segment))
    }
  })
  // iterate over the intersections and find the one(s) with the highest number
  // of path segments in common
  const bestMatches = segmentIntersections.reduce(
    ({ max, paths }, { path, intersection }) => {
      const numInCommon = intersection.length
      if (numInCommon > max) {
        // if the intersection has more segments in common than the previous max,
        // set the max equal to the number in common and reinitialize the paths arr
        max = numInCommon
        paths = [path]
      } else if (numInCommon === max) {
        // if the intersection has an equal number of matching segments with the max,
        // simply add the intersection path to the paths arr
        paths = paths.concat(path)
      }
      return {
        max,
        paths
      }
    },
    {
      max: 0,
      paths: []
    }
  ).paths
  // If there is a one-to-one mapping, return it, otherwise return null because
  // the mapping was unsuccessful
  return bestMatches.length === 1 ? bestMatches[0] : null
}

/**
 * This function attempts to find the value (size) of a given file path on master
 * by mapping the file path intelligently to the
 * @param  {Object} file - The file to map
 * @param  {Object} masterValues - A dictionary of path/size values that represents the files on the master branch
 * @return {number|null} - The size of the mapped file on master. If unable to map, this will return null.
 */
const getMasterValue = ({ file, masterValues }) => {
  const { path, pattern } = file
  // first check to see if there is an exact match
  let masterValue = masterValues[path]
  if (!masterValue) {
    const mappedFilename = mapPathToMaster({
      path,
      pattern,
      masterValues
    })
    if (mappedFilename) {
      debug(`mapped filename "${path}" to master`, mappedFilename)
      masterValue = masterValues[mappedFilename]
    } else {
      debug(`unable to map filename "${path}" to master with pattern`, pattern)
    }
  }
  return masterValue || null
}

module.exports = getMasterValue
