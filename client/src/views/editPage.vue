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
              <div class="form-group">
                <label for="Description">Description:</label>
                <textarea class="form-control" v-model="description"/>
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
      price: '',
      description: ''
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
        this.description = data.description
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
          this.$emit('fetch', true)
          this.$root.$emit('bv::hide::modal', 'modal-1')
          this.$swal.fire({
            type: 'success',
            title: 'Success!',
            text: `Your product has been updated!`,
            showConfirmButton: false,
            timer: 1500
          })
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
