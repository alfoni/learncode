(function (window) {

  var getFunctionName = function (value) {
    var funcNameRegex = /function (.{1,})\(/;
    var results = (funcNameRegex).exec(value.toString());
    return (results && results.length > 1) ? results[1] : "";
  };

  var path = [];
  var refs = []; 
  var createTree = function (value, index, key, isHidden) {
    
    key = typeof key === 'string' ? key : null;
    
    if (refs.indexOf(value) >= 0) {
      value = '[Circular]';
    }

    if (index !== undefined) {
      path.push(index);
    }

    if (value instanceof Error) {
      var stack = value.stack.split('\n');
      stack.shift(); // Remove message
      value = {
        type: 'error',
        prop: key,
        isHidden: isHidden,
        value: {
          message: getFunctionName(value.constructor) + ': ' + value.message,
          stack: stack
        },
        expand: false,
        path: path.slice(),
        children: []
      };
      path.pop();
      return value;     
    }

    if (Array.isArray(value)) {
      refs.push(value);
      var children = value.map(createTree);
      value = {
        type: 'array',
        prop: key,
        isHidden: isHidden,
        value: getFunctionName(value.constructor),
        expand: children.length < 5 && children.length > 0 && !path.length,
        path: path.slice(),
        children: children
      }
      path.pop();
      refs.pop();
      return value;
    }

    if (typeof value === 'object' && value !== null) {
      refs.push(value);
      var keys = Object.keys(value);
      var children = keys.map(function (key, index) {
        return createTree(value[key], index, key);
      });
      children = children.concat(Object.getOwnPropertyNames(value).filter(function (key) {
        return keys.indexOf(key) === -1 && key !== '__proto__';
      }).map(function (key) {
        return createTree(value[key], index, key, true);
      }));
      value = {
        type: 'object',
        prop: key,
        isHidden: isHidden,
        value: getFunctionName(value.constructor),
        expand: children.length < 5 && children.length > 0 && !path.length,
        path: path.slice(),
        children: children
      };
      path.pop();
      refs.pop();
      return value;
    }

    value = {
      type: typeof value,
      prop: key,
      isHidden: isHidden,
      value: typeof value === 'function' ? getFunctionName(value) : value,
      expand: false,
      path: path.slice(),
      children: []
    };
    path.pop();
    return value;

  };

  var log = window.console.log;
  window.console.log = function () {

    window.parent.postMessage({
      signal: 'sandboxLogged',
      message: [[].slice.call(arguments).map(function (arg) {
        return createTree(arg);
      })]
    }, 'http://learncode.com:3000');
    log.apply(window.console, arguments);

  };

  window.onerror = function (msg, url, line, col, error) {

    window.parent.postMessage({
      signal: 'sandboxLogged',
      message: [[createTree(error)]]
    }, 'http://learncode.com:3000');  

  };

  window.addEventListener('click', function (event) {

    var path = [];
    var currentTarget = event.target;

    while (currentTarget.parentNode) {
      path.unshift(
        [].indexOf.call(currentTarget.parentNode.childNodes, currentTarget)
      );
      currentTarget = currentTarget.parentNode;
    }
    window.parent.postMessage({
      signal: 'appClicked',
      message: [{
        x: event.clientX,
        y: event.clientY
      }, path]
    }, 'http://learncode.com:3000');

  });

  window.addEventListener('message', function (event) {
    if (event.data.type === 'click') {
      var currentTarget = window.document;
      var path = event.data.args[0];
      path.forEach(function (childNodeIndex, index) {
        currentTarget = currentTarget.childNodes[childNodeIndex];
        if (index === path.length - 1) {
          currentTarget.click();
        }
      });
    }
  });


}(window))