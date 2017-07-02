const parse = require('../src/parser');

let result;

describe('reporter', () => {
  describe('output', () => {
    describe('for one file below threshold', () => {
      beforeEach(() => {
        result = parse([
          {
            size: 10,
            threshold: 20,
            path: '/kittens.min.js',
          },
        ]);
      });
      it('passes globally', () => {
        expect(result.status).toBe('pass');
        expect(result.message).toBe('bundle size < threshold');
      });
      it('passes for file', () => {
        expect(result.files[0].status).toBe('pass');
        expect(result.files[0].message).toBe('/kittens.min.js: 10B < threshold 20B gzip');
      });
    });

    describe('for multiple files below threshold', () => {
      beforeEach(() => {
        result = parse([
          {
            size: 10,
            threshold: 20,
            path: '/kittens.min.js',
          },
          {
            size: 100,
            threshold: 200,
            path: '/big-kittens.min.js',
          },
        ]);
      });
      it('passes globally', () => {
        expect(result.status).toBe('pass');
        expect(result.message).toBe('bundle size < threshold');
      });
      it('passes for first file', () => {
        expect(result.files[0].status).toBe('pass');
        expect(result.files[0].message).toBe('/kittens.min.js: 10B < threshold 20B gzip');
      });
      it('passes for second file', () => {
        expect(result.files[1].status).toBe('pass');
        expect(result.files[1].message).toBe('/big-kittens.min.js: 100B < threshold 200B gzip');
      });
    });

    describe('for one file above threshold', () => {
      beforeEach(() => {
        result = parse([
          {
            size: 10,
            threshold: 5,
            path: '/fat-kittens.min.js',
          },
        ]);
      });
      it('fails globally', () => {
        expect(result.status).toBe('fail');
        expect(result.message).toBe('bundle size > threshold');
      });
      it('fails for file', () => {
        expect(result.files[0].status).toBe('fail');
        expect(result.files[0].message).toBe('/fat-kittens.min.js: 10B > threshold 5B gzip');
      });
    });

    describe('for multiple files with mixed result', () => {
      beforeEach(() => {
        result = parse([
          {
            size: 10,
            threshold: 20,
            path: '/kittens.min.js',
          },
          {
            size: 10,
            threshold: 5,
            path: '/fat-kittens.min.js',
          },
        ]);
      });
      it('fails globally', () => {
        expect(result.status).toBe('fail');
        expect(result.message).toBe('bundle size > threshold');
      });
      it('passes for first file', () => {
        expect(result.files[0].status).toBe('pass');
        expect(result.files[0].message).toBe('/kittens.min.js: 10B < threshold 20B gzip');
      });
      it('fails for second file', () => {
        expect(result.files[1].status).toBe('fail');
        expect(result.files[1].message).toBe('/fat-kittens.min.js: 10B > threshold 5B gzip');
      });
    });

    describe('for one file below threshold with lower master size', () => {
      beforeEach(() => {
        result = parse([
          {
            size: 10,
            threshold: 20,
            path: '/kittens.min.js',
          },
        ], {
          '/kittens.min.js': 15
        });
      });
      it('passes globally', () => {
        expect(result.status).toBe('pass');
        expect(result.message).toBe('bundle size < threshold');
      });
      it('passes for file with master message', () => {
        expect(result.files[0].status).toBe('pass');
        expect(result.files[0].message).toBe('/kittens.min.js: 10B < threshold 20B gzip (5B smaller than master, good job!)');
      });
    });

    describe('for one file below threshold with same master size', () => {
      beforeEach(() => {
        result = parse([
          {
            size: 10,
            threshold: 20,
            path: '/kittens.min.js',
          },
        ], {
          '/kittens.min.js': 10
        });
      });
      it('passes globally', () => {
        expect(result.status).toBe('pass');
        expect(result.message).toBe('bundle size < threshold');
      });
      it('passes for file with master message', () => {
        expect(result.files[0].status).toBe('pass');
        expect(result.files[0].message).toBe('/kittens.min.js: 10B < threshold 20B gzip (same as master)');
      });
    });

    describe('for one file below threshold with larger master size', () => {
      beforeEach(() => {
        result = parse([
          {
            size: 10,
            threshold: 20,
            path: '/kittens.min.js',
          },
        ], {
          '/kittens.min.js': 5
        });
      });
      it('warns globally', () => {
        expect(result.status).toBe('warn');
        expect(result.message).toBe('bundle size > master branch');
      });
      it('warns for file with master message', () => {
        expect(result.files[0].status).toBe('warn');
        expect(result.files[0].message).toBe('/kittens.min.js: 10B < threshold 20B gzip (5B larger than master, careful!)');
      });
    });
  });
});
