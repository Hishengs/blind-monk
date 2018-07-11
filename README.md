# blind-monk
A Tool for Data Mock and Check

## Data Mock
example
```js
const reqMockData = BPMock.mockData({
  a1: 'string',
  a2: 'number|0-100.1-4',
  a3: ['string'],
  a4: ['string', 'number'],
  a5: [{
    a51: 'string',
    a52: 'boolean',
  }],
  a6: [['number', {
    a61: 'string',
    a62: 'boolean',
  }]],
  a7: {
    a71: 'string',
    a72: 'number',
  },
  a8: BPMock.define({
    define: 'string',
    required: false,
  }),
  a9: BPMock.define({
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
    {
      "a51": "oskuuvyjb",
      "a52": false
    },
    {
      "a51": "krwskcixtq",
      "a52": true
    },
    {
      "a51": "dvluoum",
      "a52": true
    },
    {
      "a51": "fwsd",
      "a52": true
    },
    {
      "a51": "mxs",
      "a52": true
    }
  ],
  "a6": [
    [
      591,
      {
        "a61": "nanthggnu",
        "a62": true
      }
    ],
    [
      695,
      {
        "a61": "tlgrzq",
        "a62": false
      }
    ],
    [
      816,
      {
        "a61": "bwndhtji",
        "a62": false
      }
    ],
    [
      501,
      {
        "a61": "ndtoekdxv",
        "a62": false
      }
    ],
    [
      285,
      {
        "a61": "wbiex",
        "a62": true
      }
    ]
  ],
  "a7": {
    "a71": "knewpy",
    "a72": 958
  },
  "a8": "gyagbmtbi",
  "a9": "主"
}
```

## Data Check
example
```js
BPMock.check({
  // disabled: true, // 是否对请求参数进行验证
  mock: true, // 是否构造请求参数数据
  params: {
    a: {
      a1: 'string',
      a2: 'number|0-100',
      a3: ['string', 'number'],
      a4: ['string'],
      a5: BPMock.define({
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
    "a6": {
      "a61": "gcijfq",
      "a62": 666
    },
    "a7": [
      {
        "a71": "pblkoeod",
        "a72": 442
      },
      {
        "a71": "leblpxql",
        "a72": 71
      },
      {
        "a71": "ykwbocy",
        "a72": 782
      },
      {
        "a71": "bwrmt",
        "a72": 551
      },
      {
        "a71": "vtpilly",
        "a72": 114
      },
      {
        "a71": "uttbskiko",
        "a72": 157
      },
      {
        "a71": "nbdqhql",
        "a72": 483
      },
      {
        "a71": "iwjhxhhq",
        "a72": 493
      },
      {
        "a71": "glexvsthho",
        "a72": 271
      }
    ],
    "a8": [
      "hhknwp",
      {
        "a81": "wmcvwr",
        "a82": 681
      }
    ]
  }
}
```