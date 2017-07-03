const bytes = require('bytes');

module.exports = (files, masterValues = {}) => {
  files.map(file => (file.master = masterValues[file.path]));

  files = files.map(file => {
    const { path, size, master, maxSize } = file;

    file.message = `${path}: ${bytes(size)} `;
    file.status = 'pass';

    /*
      if size > maxSize, fail
      else if size > master, warn + pass
      else yay + pass
    */

    if (size > maxSize) {
      file.message += `> maxSize ${bytes(maxSize)} gzip`;
      file.status = 'fail';
    } else if (!master) {
      file.message += `< maxSize ${bytes(maxSize)} gzip`;
    } else {
      file.message += `< maxSize ${bytes(maxSize)} gzip `;
      const diff = size - master;

      if (diff < 0) {
        file.message += `(${bytes(Math.abs(diff))} smaller than master, good job!)`;
      } else if (diff > 0) {
        file.message += `(${bytes(diff)} larger than master, careful!)`;
        file.status = 'warn';
      } else {
        file.message += `(same as master)`;
      }
    }

    return file;
  });

  const globalStatus = files.reduce((prev, file) => {
    if (prev === 'pass' && file.status !== 'pass') {
      return file.status;
    }
    if (prev === 'warn' && file.status === 'fail') {
      return file.status;
    }
    return prev;
  }, 'pass');

  const globalMessage = globalStatus === 'pass'
    ? 'bundle size < maxSize'
    : globalStatus === 'warn'
      ? 'bundle size > master branch'
      : 'bundle size > maxSize'

  return {
    status: globalStatus,
    message: globalMessage,
    files: files,
  };
};
