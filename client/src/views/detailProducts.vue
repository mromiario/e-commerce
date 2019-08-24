<template>
<div>
  <h1>Title : {{product.name}}</h1>
   <h1>Price : {{product.price}}</h1>
    <h1>seller : {{product.seller}}</h1>
    <h1>stock : {{product.stock}}</h1>
    <img :src="product.image"/>
    <a href="#" @click="addCart(product._id)">Add to Cart</a> <br>
    <router-link :to=" `/buy/${product._id}` ">Buy this book</router-link>
</div>
</template>

<script>
const baseUrl = 'http://localhost:3000/api'
export default {
  name: 'detailProducts',
  data () {
    return {
      product: null
    }
  },
  methods: {
    fetchData () {
      this.axios.get(baseUrl + '/products/' + this.$route.params.id)
        .then(({ data }) => {
          this.product = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    addCart (id) {
      this.axios.get(baseUrl+'/users/', {headers : {
          token : localStorage.getItem('token')
      }})
      .then(({data})=>{
        console.log(data.cart);
        let cartId = data.cart.map(e => e._id)
        if(!cartId.includes(id)){
          this.axios.patch(baseUrl + '/cart/add', 
          {
            cart : id
          } ,
          {headers : {
            token : localStorage.getItem('token')
          }})
          .then(({data})=>{
            console.log(data);
            this.$router.push('/my-profile')
          })
          .catch(err=>{
            console.log(err);
          })
        }else{
          console.log('this book is already in your cart');
        }
        
      })
      .catch(err=>{
          console.log(err);
      })
    }

  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route.params.id': function () {
      this.fetchData()
    }
  }

}
</script>

<style>

</style>
