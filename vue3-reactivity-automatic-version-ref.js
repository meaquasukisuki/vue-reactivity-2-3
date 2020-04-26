// We use "ref" to fix the problem in effect:
// non-reactive salePrice.

// ref takes an inner value and returns a reactive and mutable ref object,
// the ref object has a single property".value" that points to the inner value

// let salePrice = ref(0)

// We need somehow make salePrice "reactive".


// object Accessors
let user = {
    firstName:"Chang",
    lastName:"shit",

    get fullName() {
        return `${this.firstName} ${this.lastName}`
    },

    set fullName(value) {
        [this.firstName,this.lastName] = value.split(" ")
    }
}

console.log(`Name is ${user.fullName}`);

user.fullName = "Ni Ma"

console.log(`Name is ${user.fullName}`);

// use object Accessors to implement ref function

function ref(raw) {
    const r = {
        get value() {
            track(r,"value");
            return raw;
        },
        set value(newVal) {
            raw = newVal;
            trigger(r,"value")
        }
    }
    return r;
}

export default ref;



