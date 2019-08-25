<template>
<div>

    <div class="card pb-3">
      <h5 class="card-header">{{product.name}}</h5>
      <div class="row mt-2 ml-4">
        <img :src="product.image" width="300px" height="300px">
        <div class="card-body">
          <h5 class="card-title">Price: {{product.price}} IDR</h5>
          <h5 class="card-title">Stock: {{product.stock}}</h5>
          <h6 class="card-title">Seller: {{product.seller.name}}</h6>
          <h6 class="card-title">Status: {{product.status}}</h6>
           <p class="card-text">Description: {{product.description}}</p>
          <div class="column pb-2" v-if="login">
            <a href="#" class="btn btn-primary mr-3" @click="addCart(product._id)">Add to Cart</a>
            <router-link :to=" `/buy/${product._id}` "><a href="#" class="btn btn-primary mr-2"> Buy this book</a></router-link>
          </div>
          <router-link :to=" `/products` "><a href="#" class="btn btn-secondary mr-2"> Close detail</a></router-link>
        </div>
      </div>
  </div>
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
  props: ['login'],
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
      this.axios.get(baseUrl + '/users/', { headers: {
        token: localStorage.getItem('token')
      } })
        .then(({ data }) => {
          console.log(data.cart)
          let cartId = data.cart.map(e => e._id)
          if (!cartId.includes(id)) {
            this.axios.patch(baseUrl + '/cart/add',
              {
                cart: id
              },
              { headers: {
                token: localStorage.getItem('token')
              } })
              .then(({ data }) => {
                this.$swal.fire({
                  type: 'success',
                  title: 'Success!',
                  text: 'this product has been addede to your cart!',
                  showConfirmButton: false,
                  timer: 1500
                })
                console.log(data)
                this.$router.push('/my-profile')
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            this.$swal.fire({
              type: 'error',
              title: 'Oops!',
              text: 'It seems this product has already inside your cart!',
              showConfirmButton: false,
              timer: 1500
            })
            console.log('this book is already in your cart')
          }
        })
        .catch(err => {
          console.log(err)
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
