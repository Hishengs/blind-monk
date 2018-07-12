const assert = require('assert');
const BlindMonk = require('../index.js');
const { getType } = require('../lib/util.js');

// check string
describe('string', () => {
  describe(`'string'`, () => {
    it('should be a string', () => {
      const str = BlindMonk.mockData('string');
      assert.equal(getType(str), 'string');
    });
  });

  describe(`'string|5'`, () => {
    it('should be 5', () => {
      const str = BlindMonk.mockData('string|5');
      assert(str.length === 5);
    });
  });

  describe(`'string|10-20'`, () => {
    it('string length should between [10, 20]', () => {
      const str = BlindMonk.mockData('string|10-20');
      assert(str.length >= 10 && str.length <= 20);
    });
  });
});

// check number
describe('number', () => {
  describe(`'number'`, () => {
    it('should be a string', () => {
      const num = BlindMonk.mockData('number');
      assert.equal(getType(num), 'number');
    });
  });

  describe(`'number|5'`, () => {
    it('should be 5', () => {
      const num = BlindMonk.mockData('number|5');
      assert(num === 5);
    });
  });

  describe(`'number|10-100'`, () => {
    it('should between [10, 100]', () => {
      const num = BlindMonk.mockData('number|10-100');
      assert(num >= 10 && num <= 100, 'should between [10, 100]');
    });
  });

  describe(`'number|-100-0'`, () => {
    it('should between [-100, 0]', () => {
      const num = BlindMonk.mockData('number|-100-0');
      assert(num >= -100 && num <= 0, 'should between [-100, 0]');
    });
  });

  describe(`'number|-100--20'`, () => {
    it('should between [-100, -20]', () => {
      const num = BlindMonk.mockData('number|-100--20');
      assert(num >= -100 && num <= -20, 'should between [-100, -20]');
    });
  });

  // decimal bits
  describe(`'number|.2'`, () => {
    it('decimal bits be 2', () => {
      const num = BlindMonk.mockData('number|.2');
      assert.equal(num.toString().split('.')[1].length, 2);
    });
  });

  describe(`'number|.2-5'`, () => {
    it('decimal bits be between [2, 5]', () => {
      const num = BlindMonk.mockData('number|.2-5');
      const decimalBits = num.toString().split('.')[1].length;
      assert(decimalBits >= 2 && decimalBits <= 5);
    });
  });
});

// check boolean
describe('boolean', () => {
  describe(`'boolean'`, () => {
    it('should be boolean', () => {
      const boolVal = BlindMonk.mockData('boolean');
      assert.equal(getType(boolVal), 'boolean');
    });
  });

  describe(`'boolean|1-2'`, () => {
    it('should be boolean, 1/2 posibility to be true', () => {
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
  describe(`${JSON.stringify(define)}`, () => {
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

// check array
describe('array', () => {
  describe(`['string']`, () => {
    it('element in array should all be string', () => {
      const arr = BlindMonk.mockData(['string']);
      assert(arr.every(item => getType(item) === 'string'));
    });
  });
  describe(`['string', 'number']`, () => {
    it('first element is string, second is number', () => {
      const arr = BlindMonk.mockData(['string', 'number']);
      assert(getType(arr[0]) === 'string' && getType(arr[1]) === 'number');
    });
  });
  describe(`[{ a1: 'string', a2: 'number' }]`, () => {
    it('element in array should all be object which contains string and number', () => {
      const arr = BlindMonk.mockData([{ a1: 'string', a2: 'number' }]);
      assert(arr.every(item => {
        return getType(item.a1) === 'string' && getType(item.a2) === 'number';
      }));
    });
  });
});
