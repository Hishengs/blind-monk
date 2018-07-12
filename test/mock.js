const assert = require('assert');
const BlindMonk = require('../index.js');
const { getType } = require('../lib/util.js');

// check string
describe('string', () => {
  describe(`string: 'string'`, () => {
    it('should be a string', () => {
      const str = BlindMonk.mockData('string');
      assert.equal(getType(str), 'string');
    });
  });

  describe(`string: 'string|5'`, () => {
    it('should be 5', () => {
      const str = BlindMonk.mockData('string|5');
      assert(str.length === 5);
    });
  });

  describe(`string: 'string|10-20'`, () => {
    it('string length should between [10, 20]', () => {
      const str = BlindMonk.mockData('string|10-20');
      assert(str.length >= 10 && str.length <= 20);
    });
  });
});

// check number
describe('number', () => {
  describe(`number: 'number'`, () => {
    it('should be a string', () => {
      const num = BlindMonk.mockData('number');
      assert.equal(getType(num), 'number');
    });
  });

  describe(`number: 'number|5'`, () => {
    it('should be 5', () => {
      const num = BlindMonk.mockData('number|5');
      assert(num === 5);
    });
  });

  describe(`number: 'number|10-100'`, () => {
    it('should between [10, 100]', () => {
      const num = BlindMonk.mockData('number|10-100');
      assert(num >= 10 && num <= 100, 'should between [10, 100]');
    });
  });
});

// check boolean
describe('boolean', () => {
  describe(`boolean: 'boolean'`, () => {
    it('should be boolean', () => {
      const boolVal = BlindMonk.mockData('boolean');
      assert.equal(getType(boolVal), 'boolean');
    });
  });

  describe(`boolean: 'boolean|1-2'`, () => {
    it('should be boolean', () => {
      const boolVal = BlindMonk.mockData('boolean|1-2');
      assert.equal(getType(boolVal), 'boolean');
    });
  });
});

// check object
describe('object', () => {
  const define = {
    a1: 'string',
    a2: 'number',
    a3: 'boolean',
  };
  describe(`object: ${JSON.stringify(define)}`, () => {
    it(`should be ${JSON.stringify(define)}`, () => {
      const data = BlindMonk.mockData(define);
      assert(
        getType(data.a1) === 'string' &&
        getType(data.a2) === 'number' &&
        getType(data.a3) === 'boolean'
      );
    });
  });
});
