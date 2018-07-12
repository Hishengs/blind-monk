const { isType, getType } = require('./util.js');
const { mockData } = require('./mock.js');
const config = require('./config.js');

const FLAG = '__BPMock__';

function checkParams (definedParams, params) {
  for (const key of Object.keys(definedParams)) {
    const define = definedParams[key];
    const keyType = getType(define);
    if (!params.hasOwnProperty(key)) {
      if (keyType === 'object') {
        // self define
        if (define.hasOwnProperty(FLAG)) {
          if (define.required) {
            throw new ReferenceError(`${FLAG} key: ${key} is required`);
          }
        } else throw new ReferenceError(`${FLAG} key: ${key} is required`);
      } else throw new ReferenceError(`${FLAG} key: ${key} is required`);
    } else {
      const value = params[key];
      checkData(key, define, value);
    }
  }
}

function checkData (key, define, value) {
  if (isType('string', define)) {
    return checkBasic(key, define, value);
  } else if (isType('object', define)) {
    return checkObject(key, define, value);
  } else if (isType('array', define)) {
    return checkArray(key, define, value);
  } else throw new TypeError(`${FLAG} define type: ${getType(define)} is unsupported, only [string, array, object] expected`);
}

function checkBasic (key, define, value) {
  console.log(`>>> checking key: ${key}`);
  const [type, rule = ''] = define.split('|');
  // type check
  checkType(key, value, type);
  // check if value if valid
  checkValue(key, value, type, rule);
}

function checkValue (key, value, type, rule) {
  if (type === 'string') {
    const [range] = rule.split('.');
    if (range) {
      const [min, max = min] = getRange(range);
      if (value.length < min || value.length > max) {
        throw RangeError(`string '${key}' length expected in range: [${min}-${max}], got ${value.length}`);
      }
    }
  } else if (type === 'number') {
    const [range = '', bitRange = '0'] = rule.split('.');
    if (range) {
      const [min, max = min] = getRange(range);
      const [minBit, maxBit = minBit] = bitRange.split('-');
      const [left = 0, right = ''] = value.toString().split('.');
      if (Number(left) < min || Number(left) > max || right.length < minBit || right.length > maxBit) {
        throw RangeError(`number '${key}' expected in range: [${min}-${max}.${minBit}-${maxBit}], got ${value}`);
      }
    }
  }
}

function checkType (key, value, type) {
  if (!isType(type, value)) {
    throw new TypeError(`${FLAG} type of '${key}' check failed, ${type} expected, got ${getType(value)}`);
  }
}

// 检测参数类型为数组
/*
1. ['string']
2. ['string', 'number']
3. [] 空数组，则完全不检测
4. ['string', {
     a1: 'string',
     a2: 'number'
   }] 更复杂的结构 
*/
function checkArray (key, defineArr, value) {
  checkType(key, value, 'array');
  if (defineArr.length) {
    if (defineArr.length === 1) {
      value.forEach(item => {
        checkData(key, defineArr[0], item);
      });
    } else {
      defineArr.forEach((define, index) => {
        checkData(key, define, value[index]);
      });
    }
  }
}

// 检测参数类型为对象
function checkObject (key, define, value) {
  checkType(key, value, 'object');
  // self define
  if (define.hasOwnProperty(FLAG)) {
    checkData(key, define.define, value);
  } else {
    for (const subKey of Object.keys(define)) {
      checkData(`${key}.${subKey}`, define[subKey], value[subKey]);
    }
  }
}

function check (config, paramsData) {
  config = Object.assign({
    disabled: this.config.check.disabled,  // if check params
    mock: this.config.check.mock,          // if build mock params data
  }, config);
  return new Promise((resolve, reject) => {
    try {
      console.log(`>>> checking data`);
      if (!config.disabled) {
        checkParams(config.params, paramsData);
      }
      if (config.mock) {
        resolve(mockData(config.params));
      } else resolve(paramsData);
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  check,
};