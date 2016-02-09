const sessions = {}

export default {
  get(id) {
    return sessions[id];
  },
  set(id) {
    sessions[id] = id;
    return id;
  }
}
