// What if we have multiple reactive object?
// each need to track effects



export const targetMap = new WeakMap() //WeakMap's key is object


//slightly tweak this in automatic version
function track(target,key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target,(depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key,(dep = new Set()))
  }
  dep.add(effect)
}

export function trigger(target,key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => {effect()})
  }
}

//test

let product = {
  price:5,
  quantity:2
};
let total = 0;
let effect = () => {
  total = product.price * product.quantity
}

track(product,"quantity")

effect()


// Now we have ways to storing our effects,but we need to 
// run everything mannually,we need a way to make it "automatic"
