const assert = require('assert');
const BlindMonk = require('../index.js');
const { getType } = require('../lib/util.js');

// check string
describe('string', () => {
  const data = {
    a1: 'hisheng',
    a2: 'xx',
    a3: 'words',
  };
  describe(`params check1`, () => {
    it(`should all pass`, (done) => {
      BlindMonk.check({
        params: {
          a1: 'string',
          a2: 'string|2-5',
          a3: 'string|5'
        },
      }, data).then(() => {
        done();
      }).catch(done);
    });
  });

  describe(`params check2`, () => {
    it(`should all not pass`, (done) => {
      BlindMonk.check({
        params: {
          a1: 'number',
          a2: 'string|5-10',
          a3: 'string|7'
        },
      }, data).then(() => {
        done(new Error('check failed'));
      }).catch(() => {
        done();
      });
    });
  });
});

// check number
describe('number', () => {
  const data = {
    a1: 11,
    a2: 100,
    a3: -100,
    a4: 12.56,
  };
  describe(`params check1`, () => {
    it(`should all pass`, (done) => {
      BlindMonk.check({
        params: {
          a1: 'number',
          a2: 'number|0-100',
          a3: 'number|-100-0',
          a4: 'number|.2-5'
        },
      }, data).then(() => {
        done();
      }).catch(done);
    });
  });

  describe(`params check2`, () => {
    it(`should all not pass`, (done) => {
      BlindMonk.check({
        params: {
          a1: 'string',
          a2: 'number|100-200',
          a3: 'number|-200--120',
          a4: 'number|.3'
        },
      }, data).then(() => {
        done(new Error('check failed'));
      }).catch(() => {
        done();
      });
    });
  });
});

function checkObject (params) {
  return BlindMonk.check({
    // disabled: true, // 是否对请求参数进行验证
    // mock: true, // 是否构造请求参数数据
    params,
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
  });
}

describe('object', () => {
  describe(`params check1`, () => {
    it(`should all pass`, (done) => {
      checkObject({
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
      }).then(() => {
        done();
      }).catch(done);
    });
  });
  describe(`params check1`, () => {
    it(`should all not pass`, (done) => {
      checkObject({
        a: {
          a1: 'string',
          a2: 'number|0-100',
          a3: ['string', 'number'],
          a4: ['string'],
          a5: BlindMonk.define({
            define: {
              a51: 'number', // this is wrong
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
      }).then(() => {
        done(new Error('check failed'));
      }).catch(() => {
        done();
      });
    });
  });
});

// check array
describe('array', () => {
  const data = ['xxx', {
    a1: 'xxx',
    a2: 111
  }];
  describe(`params check1`, () => {
    it(`should all pass`, (done) => {
      BlindMonk.check({
        params: ['string', {
          a1: 'string',
          a2: 'number'
        }],
      }, data).then(() => {
        done();
      }).catch(done);
    });
  });

  describe(`params check2`, () => {
    it(`should all not pass`, (done) => {
      BlindMonk.check({
        params: ['string', {
          a1: 'string',
          a2: 'string'
        }],
      }, data).then(() => {
        done(new Error('check failed'));
      }).catch(() => {
        done();
      });
    });
  });
});