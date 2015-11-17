function setSeek(input, state, output, services) {
  const fullSecond = Math.floor(input.seek / 1000) * 1000;

  state.set(['recorder', 'currentSeek'], [fullSecond, Date.now()]);

  if (state.get(['recorder', 'isPlaying'])) {
    services.recorder.pause();
    services.recorder.seek(fullSecond);
    services.recorder.play();
  } else {
    state.set(['recorder', 'isPlaying'], true);
    services.recorder.seek(fullSecond);
    state.set(['recorder', 'isPlaying'], false);
  }
}

export default setSeek;
