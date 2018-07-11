function isType (type, value){
  return type === Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

module.exports = {
  isType,
};