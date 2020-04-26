// in Vue,we usually use "computed" to store a value changes depends on 
// some reactive varibles.
// 
// So we can just convert salePrice and total to computed functions.
// 

// usage:

import {effect,reactive} from './vue3-reactivity-automatic-version1';

let product = reactive({price:5,quantity:2});

let salePrice = computed(() => {
    return product.price * 0.9;
})

let total = computed(() => {
    return salePrice.value * product.quantity
})

// implement computed

export function computed(getter) {
    let result = ref(); // maybe we want computed return value to be reactive
    effect(() => result.value = getter);
    return result;
}
