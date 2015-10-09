function setActiveFile(input, state) {
  state.set(
    [
      'course',
      'selectedFile'
    ], input.index
  );
}

export default setActiveFile;
