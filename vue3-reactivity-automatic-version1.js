import { trigger } from "./vue3-reactivity-multiple-objects-manual.js"
import {targetMap} from './vue3-reactivity-multiple-objects-manual.js'

// const targetMap = new WeakMap() //WeakMap's key is object

export function track(target,key) {
  if (activeEffect) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target,(depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key,(dep = new Set()))
  }
  dep.add(activeEffect)
  }

}

// export function trigger(target,key) {
//   const depsMap = targetMap.get(target);
//   if (!depsMap) {
//     return;
//   }
//   let dep = depsMap.get(key)
//   if (dep) {
//     dep.forEach(effect => {effect()})
//   }
// }


let activeEffect = null;

export function effect(eff) {
  activeEffect = eff;
  activeEffect();
  activeEffect = null;
}

export function reactive(target) {
  const handler = {
    get(target,key,receiver) {      
      let result =  Reflect.get(target,key,receiver);
      track(target,key)
      return result;
    },
    set(target,key,value,receiver) {
      let oldValue = target[key];
      let result =  Reflect.set(target,key,value,receiver);
      if (oldValue != value) {
        trigger(target,key)
      }
      return result
    }
  }
  return new Proxy(target,handler)
}

let product = reactive({
  price:5,
  quantity:2
})

let salePrice = 0
let total = 0

effect(() => {
  total = product.price * product.quantity
})

// if the number 1 effect was set to this:
// effect(() => {
//   total = salePrice * product.quantity
// })
// it will not working.(get the correct total),Because salePrice is not reactive!

effect(() => {
  salePrice = product.price * 0.9
})

console.log(total);
product.quantity = 3;
console.log(total);
product.price = 10;

console.log(`updated quantity to ${product.quantity}`)



