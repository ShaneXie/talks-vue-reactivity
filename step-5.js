class Dep {
  static job;
  constructor() {
    this.subscribers = new Set();
  }
  depend() {
    if (Dep.job) {
      this.subscribers.add(Dep.job);
    }
  }
  notify() {
    this.subscribers.forEach(sub => {
      sub();
    });
  }
}
Dep.job = null;

function observable(obj) {
  Object.keys(obj).forEach(key => {
    let value = observable(obj[key]);
    const dep = new Dep();
    Object.defineProperty(obj, key, {
      get() {
        dep.depend();
        return value;
      },
      set(newValue) {
        value = newValue;
        dep.notify();
      }
    });
  });
  return obj;
}

function runner(job) {
  Dep.job = job;
  job();
  Dep.job;
}
