const Build = function() {};

Build.prototype.start = jest.fn(() => {});
Build.prototype.pass = jest.fn(() => {});
Build.prototype.fail = jest.fn(() => {});
Build.prototype.error = jest.fn(() => {});

module.exports = Build;
