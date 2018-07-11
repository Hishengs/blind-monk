function getType (value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

function isType (type, value) {
  return type === getType(value);
}

module.exports = {
  getType,
  isType,
};