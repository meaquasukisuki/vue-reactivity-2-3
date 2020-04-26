let activeUpdate;


class Dep {
  constructor() {
    this.subscribers = new Set();    
  }

  depend() {
    if (activeUpdate) {
      this.subscribers.add(activeUpdate)
    }
  }

  notify() {
    this.subscribers.forEach((sub) => sub())
  }
}

function observe(obj) {  
  Object.keys(obj).forEach((key) => {
    let initialValue = obj[key]
    // create a dep  set for every property
    let dep = new Dep();
    Object.defineProperty(obj,key,{
      get() {
        // when access one property,
        // We need to add the dependency for that property.        
        dep.depend()
        return initialValue;
      },
      set(val) {
        // return the new value
        initialValue = val;
        dep.notify()
      }
    })
  })
}

function autoRun(updateFunc) {
  function wrappedUpdate() {
    activeUpdate = updateFunc;
    updateFunc();
    activeUpdate = null;
  }
  wrappedUpdate()
}

let state = {
  count:0
}

observe(state);

autoRun(() => {
  console.log("start");
  console.log(state.count);
  console.log("end");  
})



state.count = 2;

