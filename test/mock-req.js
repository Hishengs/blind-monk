const BlindMonk = require('../index.js');

const reqMockData = BlindMonk.mockData({
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

console.log(JSON.stringify(reqMockData, null, 2));
// console.log(BlindMonk.mockData('number|-100-100'));