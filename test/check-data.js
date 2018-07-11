const BPMock = require('../index.js');

BPMock.config.check.mock = true;
BPMock.config.check.disabled = true;

BPMock.check({
  // disabled: true, // 是否对请求参数进行验证
  // mock: true, // 是否构造请求参数数据
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