const Mock = require('mockjs');
const { isType } = require('./util.js');
const { mockReq } = require('./mock.js');
// 请求
/*
{
  name: '获取用户信息',
  mockReq: false,
  params: {
    a: {
      a1: 'string',
      a2: 'number',
      a3: [{
        a31: 'string',
        a32: 'number',
      }],
    },
  }
}

// the request params data
{
  a: {
    a1: 'hisheng',
    a2: 1200,
    a3: [{
      a31: 'handsome',
      a32: 11,
    }],
  }
}
*/
const FLAG = '[params check]';

function checkParams (definedParams, params) {
  for (const key of Object.keys(definedParams)) {
    console.log(`>>> checking param: ${key}`);
    const keyType = Object.prototype.toString.call(definedParams[key]).slice(8, -1).toLowerCase();
    if (!params.hasOwnProperty(key)) {
      if(!keyConfig.includes('optional')){
        throw new ReferenceError(`${FLAG} key: ${key} is required`);
      }
      if (keyType === 'string') {
        throw new ReferenceError(`${FLAG} key: ${key} is required`);
      } else if (keyType === 'object') {
        if (!(definedParams[key] && definedParams[key].type_ && !definedParams[key].required)) {
          throw new ReferenceError(`${FLAG} key: ${key} is required`);
        }
      }
    } else {
      if (keyType === 'string') {
        const [type, rule] = definedParams[key].split('|');
        if (!isType(type, params[key])) {
          throw new TypeError(`${FLAG} value type of ${key} is wrong, ${type} expected`);
        }
      } else if (keyType === 'array') {
        checkArray(key, definedParams[key], params[key]);
      } else if (keyType === 'object') {
        checkObject(key, definedParams[key], params[key]);
      } else throw new TypeError(`${FLAG} key type of ${key} is wrong, [string, array, object] expected`);
    }
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
function checkArray (key, arr, value) {
  if (arr.length) {
    if (arr.length === 1) {
      if (isType('object', arr[0])){
        for (const item of value) {
          checkObject(key, arr[0], item);
        }
      } else if (isType('string', arr[0])) {
        for (const item of value) {
          if (!isType(arr[0], item)) {
            throw new TypeError(`${FLAG} value type of ${key} is wrong, ${arr[0]} expected`);
          }
        }
      }
    } else {
      arr.forEach((type, index) => {
        if (isType('object', type)) {
          checkObject(key, type, value[index]);
        } else if (isType('string', type)) {
          if (!isType(type, value[index])) {
            throw new TypeError(`${FLAG} value type in ${key} is wrong, ${type} expected`);
          }
        }
      });
    }
  }
}

// 检测参数类型为对象
function checkObject (key, obj, value) {
  if (obj.type_) {
    if (value) {
      checkParams(obj.define_, value);
    } else {
      // 是否必须
      if (obj.required) {
        throw new ReferenceError(`${FLAG} key: ${key} is required`);
      }
    }
  } else {
    checkParams(obj, value);
  }
}

function defineReq (define, params) {
  return new Promise((resolve, reject) => {
    try {
      console.log(`>>> checking params of ${define.name}`);
      checkParams(define.params, params);
      resolve(params);
    } catch (err) {
      reject(err);
    }
  });
}

// test
/* defineReq({
  name: '获取用户信息',
  mock: false,
  params: {
    a: {
      a1: 'string',
      a2: 'number',
      a3: ['string', 'number'],
      a4: ['string'],
      a5: {
        type_: 'object',
        define_: {
          a51: 'string',
          a52: 'boolean',
        }
      },
      a6: {
        a61: 'string',
        a62: 'number',
      },
      a7: [{
        a71: 'string',
        a72: 'number',
      }],
      a8: ['string', {
        a81: 'string',
        a82: 'number',
      }],
    },
  }
}, {
  a: {
    a1: 'hisheng',
    a2: 1200,
    a3: ['handsome', 21],
    a4: ['xx', 'yy', 'zz'],
    a5: {
      a51: 'awesome',
      a52: false,
    },
    a6: {
      a61: 'pretty',
      a62: 22,
    },
    a7: [{
      a71: 'impressive',
      a72: 72,
    }, {
      a71: 'wise',
      a72: 72,
    }],
    a8: ['amazing', {
      a81: 'humor',
      a82: 82,
    }],
  }
}).then(params => {
  console.log('>>> done');
}).catch(err => {
  console.log('>>> check failed: \n', err);
}); */
console.log(mockReq({
  a1: 'string',
  a2: 'number|5-10',
  a6: {
    a61: 'string',
    a62: 'number',
  },
}));