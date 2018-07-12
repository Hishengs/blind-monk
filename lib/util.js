function getType (value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

function isType (type, value) {
  return type === getType(value);
}

function getRange (str) {
  const num = Number(str);
  if (num) {
    return [num, num];
  } else {
    return (str.match(/(-?\d+)\-(-?\d+)/) || []).slice(1).map(item => Number(item));
  }
}

module.exports = {
  getType,
  isType,
  getRange,
};