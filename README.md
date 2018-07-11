# Blind Monk
A Tool for Data Mock and Check

## Data Mock
example
```js
const BlindMonk = require('blind-monk');

const reqMockData = BlindMonk.mockData({
  a1: 'string',
  a2: 'number|0-100.1-4',
  a3: ['string'],
  a4: ['string', 'number'],
  a5: [{
    a51: 'string',
    a52: 'boolean',
  }],
  a8: BlindMonk.define({
    define: 'string',
    required: false,
  }),
  a9: BlindMonk.define({
    define: 'string',
    callback: (Mock) => {
      return Mock.Random.cword();
    },
  }),
});
```

output
```js
{
  "a1": "gyvmycrwe",
  "a2": 54.5038,
  "a3": [
    "gsgaydf",
    "xsen",
    "jguugioh"
  ],
  "a4": [
    "vpcdz",
    820
  ],
  "a5": [
    {
      "a51": "wdruwhwrty",
      "a52": false
    },
    {
      "a51": "qmbbqhp",
      "a52": true
    },
    {
      "a51": "ofnabsll",
      "a52": false
    },
  ],
  "a8": "gyagbmtbi",
  "a9": "主"
}
```

## Data Check
example
```js
const BlindMonk = require('blind-monk');

BlindMonk.check({
  // disabled: true, // 是否对请求参数进行验证
  mock: true, // 是否构造请求参数数据
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
    },
  }
}, {
  a: {
    a1: 'hisheng',
    a2: 20,
    a3: ['handsome', 21],
    a4: ['xx', 'yy', 'zz'],
    a5: {
      a51: 'awesome',
      a52: false,
    },
  }
}).then(params => {
  console.log('>>> done', JSON.stringify(params, null, 2));
}).catch(err => {
  console.log('>>> check failed: \n', err);
});
```

output
```js
>>> checking data
>>> done {
  "a": {
    "a1": "fmpjrfbxn",
    "a2": 35,
    "a3": [
      "yihgqyqc",
      346
    ],
    "a4": [
      "jgdppufsga",
      "dleno",
      "oabycv",
      "lefxmlwqts",
      "gviuk",
      "hzakr",
      "fitddkue",
      "wpeefp",
      "lbcvcly"
    ],
    "a5": {
      "a51": "nygcyr",
      "a52": true
    },
  }
}
```

## Doc
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