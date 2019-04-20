function setState(newState) {
  state = { ...state, ...newState };
  renderY();
}
