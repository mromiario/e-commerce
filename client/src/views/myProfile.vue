<template>
    <div class = "container">
      <div class = "row">
        <div class = "col-sm-4">
          <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="https://icon-library.net/images/free-owl-icon/free-owl-icon-20.jpg"  height="300px" alt="Profile">
            <div class="card-body">
              <h5 class="card-title">You are logged in as :</h5>
              <p class="card-text"><b>{{name}}</b></p>
              <p class="card-text">{{email}}</p>
              <a href = "#" class="btn btn-danger mr-3" @click="checkOutCart()">Empty Chart</a>
            </div>
         </div>
        </div>
        <div class = "col-sm-8">
          <h1>Your cart...</h1>
          <noData v-if="carts.length == 0"/>
          <div class="card mb-3" v-for="sell in carts" :key="sell._id">
            <h5 class="card-header">{{sell.name}}</h5>
            <div class="row mt-1 ml-1">
                <img :src="sell.image" width="100px" height="100px">
                <div class="card-body mb-4">
                  <h5 class="card-title">Price: {{sell.price}} IDR</h5>
                  <h5 class="card-title">Stock: {{sell.name}}</h5>
                  <h6 class="card-title">Status: {{sell.status}}</h6>
                    <h6 class="card-title">Seller: {{sell.seller.name}}</h6>
                  <p class="card-text">Description: {{sell.description}}</p>
                  <router-link class="btn btn-primary mr-3" :to=" `/buy/${sell._id}` ">Buy this book</router-link>
                  <a href="#" class="btn btn-danger mr-3" @click="deleteCart(sell._id)">Delete form cart</a> <br>
                </div>
            </div>
            </div>
        </div>
      </div>

    </div>
</template>

<script>
import noData from '../components/noData'
const baseUrl = 'http://localhost:3000/api'
export default {
  components: {
    noData
  },
  data () {
    return ({
      name: '',
      email: '',
      carts: []
    })
  },
  methods: {
    fetchCart () {
      this.axios.get(baseUrl + '/users/', { headers: {
        token: localStorage.getItem('token')
      } })
        .then(({ data }) => {
          console.log(data)
          this.name = data.name
          this.email = data.email
          this.carts = data.cart
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteCart (id) {
      this.$swal.fire(
        { title: 'Are you sure want to delete this product?',
          type: 'question',
          showConfirmButton: true,
          showCancelButton: true
        })
        .then((isConfirm) => {
          if (isConfirm.value) {
            this.$swal.fire({
              type: 'success',
              title: 'Success!',
              text: 'this product has been removed from your cart!',
              showConfirmButton: false,
              timer: 1500
            })
            this.axios.patch(baseUrl + '/cart/delete',
              {
                cart: id
              },
              { headers: {
                token: localStorage.getItem('token')
              } })
              .then(({ data }) => {
                console.log(data)
                this.fetchCart()
              })
              .catch(err => {
                console.log(err)
              })
          }
        })
    },
    checkOutCart () {
      this.$swal.fire(
        { title: 'This action will remove all products in your cart. Do you wish to continue?',
          type: 'question',
          showConfirmButton: true,
          showCancelButton: true
        })
        .then((isConfirm) => {
          if (isConfirm.value) {
            this.axios.patch(baseUrl + '/cart/checkout', null,
              { headers: {
                token: localStorage.getItem('token')
              } })
              .then(({ data }) => {
                this.$swal.fire({
                  type: 'success',
                  title: 'Success!',
                  text: 'You have checked out from your cart!',
                  showConfirmButton: false,
                  timer: 1500
                })
                console.log(data)
                this.fetchCart()
              })
              .catch(err => {
                console.log(err)
              })
          }
        })
    }
  },
  created () {
    this.fetchCart()
  }

}
</script>

<style>

</style>
