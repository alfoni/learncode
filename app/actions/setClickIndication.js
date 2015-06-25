let setClickIndication = function (cerebral, pos, elementPath) {
  if (cerebral.get('recorder', 'isPlaying')) {
    cerebral.set(['course', 'lastClick'], pos);
    cerebral.emit('sandbox:click', elementPath);
  }
};

export default setClickIndication;