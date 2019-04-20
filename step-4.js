function observable(obj) {
  Object.keys(obj).forEach(key => {
    let value = observable(obj[key]);
    Object.defineProperty(obj, key, {
      get() {
        return value;
      },
      set(newValue) {
        value = newValue;
        renderY();
      }
    });
  });
  return obj;
}
