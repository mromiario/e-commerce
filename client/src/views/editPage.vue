<template>
    <div>
        <h1>Edit Your Sell..</h1>
        <form @submit.prevent="edit()" >
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" class="form-control" v-model="name">
            </div>
            <div class="form-group">
                <label for="stock">Stock:</label>
                <input type="number" class="form-control" v-model="stock">
            </div>
            <div class="form-group">
                <label for="price">Price:</label>
                <input type="text" class="form-control" v-model="price">
            </div>
            <input type="submit" class="btn btn-default" style="background-color: #0f0e0ec5; color : rgb(255, 255, 255);" value="Update">
            <hr>
        </form>
    </div>
</template>

<script>
const baseUrl = 'http://localhost:3000/api'
export default {
  data () {
    return {
      name: '',
      stock: '',
      price: ''
    }
  },
  props: ['id'],
  created () {
    this.axios.get(baseUrl + '/products/' + this.id)
      .then(({ data }) => {
        console.log(data)
        this.name = data.name
        this.stock = data.stock
        this.price = data.price
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    edit () {
      console.log(localStorage.getItem('token'), 'iiii')
      this.axios.patch(baseUrl + '/products/' + this.id, {
        name: this.name,
        price: this.price,
        stock: this.stock
      },
      {
        headers: {
          token: localStorage.getItem('token')
        }
      }
      )
        .then(({ data }) => {
          console.log(data)
          this.$router.push({ path: '/sell-products' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

}
</script>

<style>

</style>
