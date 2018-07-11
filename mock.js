const Mock = require('mockjs');
const { isType } = require('./util.js');

// mock request params data
function mockReq (param) {
  const mockData = {};
  for (const key of Object.keys(param)) {
    if (isType('string', param[key])) {
      mockData[key] = mockBasicData(param[key]);
    } else if (isType('array', param[key])) {
      mockData[key] = mockArrayData(param[key]);
    } else if (isType('object', param[key])) {
      if (param[key].type_) {
        if (param[key].type_ === 'object') {
          mockData[key] = mockReq(param[key].define_);
        } else if (param[key].type_ === 'array') {
          mockData[key] = mockReq(param[key].define_);
        } else {
          mockData[key] = mockBasicData(param[key].define_);
        }
      } else mockData[key] = mockReq(param[key]);
    }
  }
  return mockData;
}

function mockArrayData (define) {
  return [];
  /* if (!define.length){
    return null;
  } else {
    const [min = 0, max = 20] = define;
    return Mock.range(min, max).map(i => {
      return 
    });
    if (define.length === 1) {
      ///
    }
  } */
}

function mockBasicData (define) {
  if (!define) return null;
  const [type, rule = ''] = define.split('|');
  // rule: 'min-max.minRepeat-maxRepeat'
  if (type === 'string') {
    const [range = '', repeatRange = '1'] = rule.split('.');
    const [min = 3, max = 7] = range.split('-').filter(item => !!item);
    const [minRepeat, maxRepeat = minRepeat] = repeatRange.split('-');
    return Mock.Random.range(Mock.Random.integer(Number(minRepeat), Number(maxRepeat)))
                .map(i => Mock.Random.string(undefined, Number(min), Number(max))).join('');
  } else if (type === 'number') {
    const [range = '', bitRange = '0'] = rule.split('.');
    const [min = 0, max = Number.MAX_SAFE_INTEGER] = range.split('-').filter(item => !!item);
    const [minBit, maxBit = minBit] = bitRange.split('-');
    return Mock.Random.float(Number(min), Number(max), Number(minBit), Number(maxBit));
  } else if (type === 'boolean') {
    const [min = 1, max = min] = rule.rule('-');
    return Mock.Random.boolean(min, max);
  } else return null;
}

module.exports = {
  mockReq,
};