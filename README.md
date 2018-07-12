# Blind Monk
A Tool for Data Mock and Check

## 使用场景
* 项目前期，前端脱离后台支持独立进行开发时需要 mock 数据支持
* 如何对传给后台的参数数据进行格式验证
* 如果对后台返回的数据进行格式验证
* 如何轻松使用后台接口数据逐步替换掉原来的 mock 数据
* 前端按照接口约定模拟假数据对后台接口进行测试

下面逐步介绍如何使用 **Blind Monk** 来完成这几件事情


### 构造假数据
```js
const BlindMonk = require('blind-monk');

// 随机构造一个字符串
BlindMonk.mockData('string');
// 随机构造一个指定长度的字符串
BlindMonk.mockData('string|5');
// 随机构造一个指定长度范围的字符串
BlindMonk.mockData('string|5-20');

// 随机构造一个数字
BlindMonk.mockData('number');
// 随机构造一个指定范围的数字
BlindMonk.mockData('number|0-100');
// 随机构造一个指定小数位的数字
BlindMonk.mockData('string|.2');

// 随机构造一个布尔值
BlindMonk.mockData('boolean');

// 随机构造一个随机长度的字符串数组
BlindMonk.mockData(['string']);
// 随机构造一个数组，第一个是字符串，第二个是数字
BlindMonk.mockData(['string', 'number']);
// 随机构造一个随机长度的对象数组
BlindMonk.mockData([{
  name: 'string',
  age: 'number',
}]);
// 随机构造一个随机长度的数组数组
BlindMonk.mockData([['number']]);

// 随机构造一个对象
BlindMonk.mockData({
  name: 'string',
  age: 'number',
});
// 随机构造一个较复杂的对象
BlindMonk.mockData({
  name: 'string',
  age: 'number',
  animals: ['string'],
  detail: {
    address: 'string',
    workAge: 'number',
    married: 'boolean',
  },
});
```

### 验证请求参数
```js
const requestData = {
  a: {
    a1: 'hisheng',
    a2: 20,
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
};

// 对发起的请求数据按照约定格式(params)进行校验
BlindMonk.check({
  // disabled: false, // 是否对请求数据进行校验
  // mock: false,    // 是否使用模拟数据发起请求
  params: {
    a: {
      a1: 'string',
      a2: 'number|0-100',
      a3: ['string', 'number'],
      a4: ['string'],
      a5: BlindMonk.define({
        define: {
          a51: 'string',
          a52: 'boolean',
        }
      }),
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
}, requestData).then(params => {
  console.log('>>> check success');
  // 验证通过之后，可以继续发起请求
}).catch(err => {
  console.log('>>> check failed: \n', err);
});
```

### 验证返回的接口数据
类似对请求数据的验证

```js
const responseData = {
  // blablabla
};
BlindMonk.check({
  // disabled: false, // 是否对请求数据进行校验
  // mock: false,    // 是否使用模拟数据发起请求
  params: {
    // blablabla
  },
}, responseData).then(data => {
  console.log('>>> check success');
  // 验证通过之后，可以将数据交给下一步使用
}).catch(err => {
  console.log('>>> check failed: \n', err);
});
```

### 关闭 mock 数据
#### 全局关闭
```js
BlindMonk.config.check.mock = true;  // 全局开启
BlindMonk.config.check.mock = false; // 全局关闭（默认）
```

#### 局部关闭
```js
BlindMonk.check({
  mock: false, // 关闭 mock
  params: {
    // blablabla
  },
}, responseData).then(params => {
  console.log('>>> check success');
}).catch(err => {
  console.log('>>> check failed: \n', err);
});
```

### 关闭对参数或者返回数据的验证
#### 全局关闭
```js
BlindMonk.config.check.disabled = false;  // 全局开启（默认）
BlindMonk.config.check.disabled = true;  // 全局关闭
```

#### 局部关闭
```js
BlindMonk.check({
  disabled: true, // 关闭数据验证
  params: {
    // blablabla
  },
}, responseData).then(params => {
  console.log('>>> check success');
}).catch(err => {
  console.log('>>> check failed: \n', err);
});
```


## 文档
mock template is based on [Mock.js](http://mockjs.com/), but a little difference.

### string
```js
BlindMonk.mockData({
  a1: 'string',
  // min: min length of string, max: max length of string
  a2: 'string|min-max',
  // detail define
  a3: BlindMonk.define({
    define: 'string',
    required: false, // will be ignored if key not exist in data
  }),
});
```

`'string|repeatCount'` is not supported


### number
```js
BlindMonk.mockData({
  a1: 'number',
  // generate a number between [min, max]
  a2: 'number|min-max',
  // generate a number between [min, max] and decimal length berween [minbit, maxbit]
  a3: 'number|min-max.minbit-maxbit',
  // detail define
  a4: BlindMonk.define({
    define: 'number',
    required: false,
  }),
});
```

`'number|+1'` is not supported


### boolean
```js
BlindMonk.mockData({
  a1: 'boolean',
  // generate a boolean probability is about (min / (min + max))
  a2: 'boolean|min-max',
  // detail define
  a3: BlindMonk.define({
    define: 'boolean',
    required: false,
  }),
});
```

### array
```js
BlindMonk.mockData({
  a1: ['string'],
  a2: ['string', 'number'],
  a3: ['string', 'number', {
    a31: 'string',
    a32: 'boolean',
  }],
});
```

### object
```js
BlindMonk.mockData({
  a1: {
    a11: 'string',
    a12: ['string', 'number'],
  },
});
```