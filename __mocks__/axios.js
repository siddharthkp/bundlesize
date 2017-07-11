module.exports = {
  get: jest.fn(() =>
    Promise.resolve({
      data: [
        {
          path: '/kittens.js',
          size: 50,
        },
      ],
    })
  ),
  post: jest.fn(() => Promise.resolve()),
};
