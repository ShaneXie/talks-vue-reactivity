Object.defineProperty(obj, key, {
  get() {
    //...
  },
  set(newValue) {
    // ...
  }
});

let value = state["x"];
Object.defineProperty(state, "x", {
  get() {
    return value;
  },
  set(newValue) {
    value = newValue;
    renderY();
  }
});
