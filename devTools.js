var onlyElements = function (elms) {
  return Array.from(elms).filter(function (elm) {
    return elm.nodeType !== 3;
  });
};

$ = function (query) {
  return {
    elms: document.querySelectorAll(query),
    get: function (index) {
      this.elms = [this.elms[index]];
      return this;
    },
    getChild: function (index) {
      this.elms = onlyElements(this.elms[0].childNodes)[index] ? [onlyElements(this.elms[0].childNodes)[index]] : [];
      return this;
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
    count: function (count) {
      if (count || typeof count === 'number') { /* if number is 0 */
        return this.elms.length === count;
      }

      return this.elms.length;
    },
    text: function (text) {
      if (text) {
        return this.elms[0].childNodes[0].textContent.toLowerCase().trim() === text.toLowerCase().trim();
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
