<template>
  <div>
    <h1>Buy this Book</h1>
    <span>{{product}}</span><br>
    <label>Qty:</label>
    <input type="number" min="0" v-model="qty"><br>
    <a href="#">Buy</a>
  </div>
</template>

<script>
const baseUrl = 'http://localhost:3000/api'
export default {
  data(){
    return{
      product: null,
      qty: 0,
      stock : 0
    }
  },
  created () {
         this.axios.get(baseUrl + '/products/' + this.$route.params.id)
        .then(({ data }) => {
          console.log(data);
          this.product = data
          this.stock = data.stock
        })
        .catch(err => {
          console.log(err)
        })
  },
  watch: {
    qty: function () {
      if(this.qty<0){
        alert('Please input the right number!')
        this.qty = 0
        return 
      }
    }

  }

}
</script>

<style>

</style>