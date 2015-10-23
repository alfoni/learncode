function seekRecording(input, state, output, services) {
  services.recorder.seek(input.seek || 0);
}

export default seekRecording;
