let assign = function () {
  let args = [].slice.call(arguments);
  let target = args.shift();
  args.forEach(function (obj) {
    Object.keys(obj).forEach(function (key) {
      target[key] = obj[key];
    });
  });
  return target;
};

export default assign;