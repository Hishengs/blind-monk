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