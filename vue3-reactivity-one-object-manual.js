// We want to save total to somewhere,
// When price/quantity changes,it reruns(recalculates)

const depsMap = new Map() //create a deps map to store diffrent dep for each object property.


// save total calculation to an effect function so
// it can be "reruned"

function track(key) {
  let dep = depsMap.get(key)
  if (!dep) {
    // let dep = new Set();
    // depsMap.set(key,dep);
    depsMap.set(key,(dep = new Set()))
  }
  dep.add(effect)
}
function trigger(key) {
  let dep = depsMap.get(key)
  if (dep) {
    dep.forEach((effect) => {
      effect()
    })
  }
}


// test

let product = {
  price:5,
  quantity:2
};
let total = 0;
let effect = () => {
  total = product.price * product.quantity
}

track("quantity")

effect()


