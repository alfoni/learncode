$ = function (query) {
  return {
    elms: document.querySelectorAll(query),
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
