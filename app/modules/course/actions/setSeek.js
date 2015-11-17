function setSeek(input, state, output, services) {
  const fullSecond = Math.floor(input.seek / 1000) * 1000;

  state.set(['recorder', 'isRecording'], true);

  if (state.get(['recorder', 'isPlaying'])) {
    services.recorder.pause();
    services.recorder.seek(fullSecond);
    services.recorder.play();
  } else {
    services.recorder.seek(fullSecond);
  }
  state.set(['recorder', 'isRecording'], false);
}

export default setSeek;
