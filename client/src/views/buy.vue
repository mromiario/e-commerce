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
          <label>Qty:</label>
          <input type="number" min="0" v-model="qty"><br>
          <a href="#" @click="buy(product._id)" class="btn btn-primary mt-3 mr-2"> Buy this book!</a>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
const baseUrl = 'http://localhost:3000/api'
export default {
  data () {
    return {
      product: null,
      qty: 1
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    qty: function () {
      if (this.qty < 0) {
        alert('Please input the right number!')
        this.qty = 1
      }
    }
  },
  methods: {
    fetchData () {
      this.axios.get(baseUrl + '/products/' + this.$route.params.id)
        .then(({ data }) => {
          console.log(data)
          this.product = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    buy (productId) {
      console.log(productId)
      if (this.product.stock >= Number(this.qty)) {
        this.$swal.fire(
          { title: `Are you sure want to continue transaction? 
        Total Transaction : ${this.qty * this.product.price} IDR`,
          type: 'question',
          showConfirmButton: true,
          showCancelButton: true
          })
          .then((isConfirm) => {
            if (isConfirm.value) {
              this.axios.post(baseUrl + '/transactions/', {
                product: productId,
                qty: this.qty
              },
              { headers: {
                token: localStorage.getItem('token')
              }
              })
                .then(({ data }) => {
                  console.log(data)
                  this.fetchData()
                  this.axios.patch(baseUrl + '/cart/delete',
                    {
                      cart: productId
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
                  this.$router.push('/history')
                })
                .catch(err => {
                  console.log(err)
                })
            }
          })
      } else {
        this.$swal.fire({
          type: 'error',
          title: 'Oops!',
          text: 'Not enough stocks of product!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  }

}
</script>

<style>

</style>
