var onlyElements = function (elms) {
  return Array.from(elms).filter(function (elm) {
    return elm.nodeType !== 3;
  });
};

var createTool = function (elms) {
  return {
    elms: elms,
    get: function (index) {
      var elements = this.elms[index] ? [this.elms[index]] : [];

      return createTool(elements);
    },
    getChild: function (index) {
      var elements = onlyElements(this.elms[0].childNodes);
      elements = elements[index] ? [elements[index]] : [];

      return createTool(elements);
    },
    is: function (tagName) {
      if (!onlyElements(this.elms).length) {
        return false;
      }

      return onlyElements(this.elms)[0].tagName === tagName.toUpperCase();
    },
    exist: function () {
      return this.elms.length > 0;
    },
    hasChild: function (query) {
      if (!this.elms.length) {
        return false;
      }

      return this.elms[0].querySelectorAll(query).length > 0;
    },
    style: function (type) {
      return this.elms[0].style[type];
    },
    count: function (count) {
      if (count || typeof count === 'number') {
        return this.elms.length === count;
      }

      return this.elms.length;
    },
    text: function (text) {
      if (text) {
        return Boolean(this.elms[0].childNodes[0]) && this.elms[0].childNodes[0].textContent.toLowerCase().trim() === text.toLowerCase().trim();
      }

      return this.elms[0].childNodes[0].textContent;
    },
    characters: function (count) {
      if (count || typeof count === 'number') {
        return this.text().length === count;
      }

      return this.text().length;
    },
    className: function (className) {
      if (className) {
        return this.elms[0].className === className;
      }

      return this.elms[0].className;
    }
  };
};

$ = function (query) {
  return createTool(document.querySelectorAll(query));
};

$.rgbaEquals = function (rgbaSrc, rgbaTarget) {
  try {
    var rgbaSrcArray = rgbaSrc.split(',');
    var rgbaTargetArray = rgbaTarget.split(',');
    var opacitySrc = Math.round(Number(rgbaSrc.replace(')', '').split(',')[3]) * 10);
    var opacityTarget = Math.round(Number(rgbaTarget.replace(')', '').split(',')[3]) * 10);
    rgbaSrcArray[3] = opacitySrc + ')';
    rgbaTargetArray[3] = opacityTarget + ')';
    return rgbaSrcArray.join('') === rgbaTargetArray.join('');
  } catch (e) {
    return false;
  }
};
