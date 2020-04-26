<div id="app">
  <div>
    Price:{{price}}
    quantity:{{quantity}}
    total:{{price * quantity}}
  </div>
</div>


new Vue({
  el: "#app",
  data: {
    price:10.00,
    quantity:5
  },
  computed:{
  	totalPriceWithTax() {
    	return this.price * this.quantity * 1.03
    }
  }
})

<!-- We want to update total when quantity/price changes -->