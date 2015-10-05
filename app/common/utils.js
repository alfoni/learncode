export default {
  propagatedThrough(event, container) {
    let currentContainer = event.target;

    while (currentContainer.parentNode) {
      currentContainer = currentContainer.parentNode;

      if (currentContainer === container) {
        return true;
      }
    }
    
    return false;
  }
};
