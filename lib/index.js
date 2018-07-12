const { check } = require('./check.js');
const { mockData } = require('./mock.js');

const FLAG = '__BPMock__';

const BPMock = {
  config: {
    check: {
      mock: false,
      disabled: false,
    },
  },
  // self define a property
  define (config) {
    config = Object.assign({
      count: null,    // 指定生成个数
      min: null,      // 最小值、最小长度、最小个数
      max: null,      // 最大值、最大长度、最大个数
      required: true, // 是否必须，校验时使用
    }, config);
    Object.defineProperty(config, FLAG, {
      enumerable: false,
      writable: false,
    });
    return config;
  },
  mockData,
  check,
};

module.exports = BPMock;