const withProxy = new Proxy(target, handler);

const depsStorage = new WeakMap();
const handlers = {
  get(target, key, receiver) {
    let deps = depsStorage.get(target);
    if (!deps) {
      deps = {};
      depsStorage.set(target, deps);
    }
    let dep = deps[key];
    if (!dep) {
      dep = deps[key] = new Dep();
    }
    dep.depend();
    return observable(target[key]);
  },
  set(target, key, value) {
    target[key] = value;
    // notify
    let deps = depsStorage.get(target);
    if (!deps) {
      return;
    }
    const dep = deps[key];
    if (dep) {
      dep.notify();
    }
  }
};
