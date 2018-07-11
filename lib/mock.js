const Mock = require('mockjs');
const { isType } = require('./util.js');
const config = require('./config.js');

// mock data, handler all types
function mockData (define) {
  if (isType('string', define)) {
    return mockBasicData(define);
  } else if (isType('object', define)) {
    return mockObject(define);
  } else if (isType('array', define)) {
    return mockArrayData(define);
  } else return undefined;
}

// for primitive data type mock
function mockBasicData (define) {
  const [type, rule = ''] = define.split('|');
  // rule: 'min-max.minRepeat-maxRepeat'
  if (type === 'string') {
    const [range = '', repeatRange = '1'] = rule.split('.');
    const [min = config.string.min, max = config.string.max] = (range.match(/(-?\d+)\-(-?\d+)/) || []).slice(1);
    const [minRepeat, maxRepeat = minRepeat] = repeatRange.split('-');
    return Mock.Random.range(Mock.Random.integer(Number(minRepeat), Number(maxRepeat)))
                .map(i => Mock.Random.string('lower', Number(min), Number(max))).join('');
  } else if (type === 'number') {
    const [range = '', bitRange = '0'] = rule.split('.');
    const [min = config.number.min, max = config.number.max] = (range.match(/(-?\d+)\-(-?\d+)/) || []).slice(1);
    const [minBit, maxBit = minBit] = bitRange.split('-');
    return Mock.Random.float(Number(min), Number(max), Number(minBit), Number(maxBit));
  } else if (type === 'boolean') {
    const [min = 1, max = min] = rule.split('-');
    return Mock.Random.boolean(min, max);
  } else return null;
}

// mock for object
function mockObject (param) {
  const mockObj = {};
  for (const key of Object.keys(param)) {
    const define = param[key];
    if (isType('string', define)) {
      mockObj[key] = mockBasicData(define);
    } else if (isType('array', define)) {
      mockObj[key] = mockArrayData(define);
    } else if (isType('object', define)) {
      // deep define
      if (define.hasOwnProperty('__BPMock__')) {
        if (isType('object', define.define)) {
          mockObj[key] = define.callback ? define.callback(Mock) : mockObject(define.define);
        } else if (isType('array', define.define)) {
          mockObj[key] = define.callback ? define.callback(Mock) : mockArrayData(define.define);
        } else if (isType('string', define.define)) {
          mockObj[key] = define.callback ? define.callback(Mock) : mockBasicData(define.define);
        } else mockObj[key] = undefined;
      } else mockObj[key] = mockObject(define);
    }
  }
  return mockObj;
}

/*
case1: ['string']
case2: ['string', 'number']
case3: ['string', 'number', { a1: 'boolean' }]
case4: [{ a1: 'boolean' }]
case5: []
*/
function mockArrayData (defineArr) {
  if (!defineArr.length) {
    return [];
  } else {
    if (defineArr.length === 1) {
      return Mock.Random.range(Mock.Random.integer(1, 10)).map(i => {
        return mockData(defineArr[0]);
      });
    } else {
      const arr = [];
      defineArr.forEach((define, index) => {
        arr[index] = mockData(define);
      });
      return arr;
    }
  }
}

module.exports = {
  mockData,
};