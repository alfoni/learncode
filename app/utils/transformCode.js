let transformCode = function (code, event) {
  let lines = code.split('\n');
  let replaceText = (
    lines[event.from.line].substr(0, event.from.ch) + 
    event.text.join('') +
    lines[event.to.line].substr(event.to.ch, lines[event.to.line].length)
  );
  lines.splice(event.from.line, event.to.line - event.from.line + 1, replaceText);
  return lines.join('\n');
};

export default transformCode;