<template>
    <div class= "container">
      <div class="row">
        <div class="col-sm-4 pb-4">
          <div class = "card">
            <div class="mt-4 ml-4 mr-4 mb-4">
              <h1>Sell Something...</h1>
              <form @submit.prevent="sellProduct()" >
                  <div class="form-group">
                      <label for="name">Name:</label>
                      <input type="text" class="form-control" maxlength="28" v-model="name">
                  </div>
                  <div class="form-group">
                      <label for="stock">Stock:</label>
                      <input type="number" min="0" class="form-control" v-model="stock">
                  </div>
                  <div class="form-group">
                      <label for="status">Status:</label>
                      <div class="radio">
                        <label><input type="radio" name="optradio" value="New" v-model="status">New</label>
                      </div>
                      <div class="radio">
                        <label><input type="radio" name="optradio" value="Old" v-model="status">Old</label>
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="price">Price:</label>
                      <input type="text" class="form-control" v-model="price">
                  </div>
                    <div class="form-group">
                      <label for="description">Description:</label>
                      <textarea class="form-control" v-model="description"/>
                  </div>
                  <form enctype="multipart/form-data">
                    <div class="form-group">
                        <label for="image">Image:</label>
                        <input type="file"
                              @change="previewFile()"
                              id="file"
                              ref="myFiles"
                              accept="image/*"
                              class="form-control">
                    </div>
                  </form>
                  <input type="submit" class="btn btn-default" style="background-color: #0f0e0ec5; color : rgb(255, 255, 255);" value="Sell">
                  <hr>
              </form>
            </div>

          </div>
        </div>

        <div class="col-sm pb-3">
          <h1>My Product to sell</h1>
          <noData v-if="sells.length == 0"/>
          <div class="card mb-3" v-for="sell in sells" :key="sell._id">
            <h5 class="card-header">{{sell.name}}</h5>
            <div class="row mt-1 ml-1">
                <img :src="sell.image" width="100px" height="100px">
                <div class="card-body mb-4">
                  <h5 class="card-title">Price: {{sell.price}} IDR</h5>
                  <h5 class="card-title">Stock: {{sell.stock}}</h5>
                  <h6 class="card-title">Status: {{sell.status}}</h6>
                  <p class="card-text">Description: {{sell.description}}</p>
                  <b-button v-b-modal.modal-1 class="btn btn-primary mr-3" @click="editItem(sell._id)">Edit</b-button>
                  <a href='#' class="btn btn-danger mr-3" @click="deleteItem(sell._id)">Delete<br> </a>
                </div>
            </div>
            </div>
            <b-modal id="modal-1" hide-footer>
              <editPage v-bind:id="id" @fetch="myList()" ></editPage>
            </b-modal>

        </div>
      </div>

    </div>

</template>

<script>
import editPage from './editPage.vue'
import noData from '../components/noData.vue'
const baseUrl = 'http://localhost:3000/api'
export default {
  data () {
    return ({
      name: '',
      stock: '',
      price: '',
      id: null,
      sells: [],
      image: '',
      status: '',
      description: ''
    })
  },
  components: {
    editPage, noData
  },
  methods: {
    sellProduct () {
      var bodyFormData = new FormData()
      bodyFormData.append('image', this.image[0])
      this.axios({
        method: 'POST',
        url: baseUrl + '/images/upload',
        data: bodyFormData,
        config: { headers: {
          token: localStorage.getItem('token')
        } }
      })
        .then(({ data }) => {
          console.log(data)
          this.image = data.link
          console.log('iniii link image', this.image)
          return this.axios.post(baseUrl + '/products', {
            name: this.name,
            stock: this.stock,
            price: this.price,
            image: this.image,
            status: this.status,
            description: this.description
          }, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
        })
        .then(({ data }) => {
          console.log(data)
          this.name = ''
          this.stock = ''
          this.price = ''
          this.image = ''
          this.$router.push({ path: '/products' })
          this.$swal.fire({
            type: 'success',
            title: 'Success!',
            text: 'Your product is uploaded!',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          console.log(err)
          this.$swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Internal Server Error!'
          })
        })
    },
    deleteItem (id) {
      this.$swal.fire(
        { title: 'Are you sure want to delete this product?',
          type: 'question',
          showConfirmButton: true,
          showCancelButton: true
        })
        .then((isConfirm) => {
          if (isConfirm.value) {
            this.axios.delete(baseUrl + '/products/' + id,
              {
                headers: {
                  token: localStorage.getItem('token')
                }
              }
            )
              .then(({ data }) => {
                this.$swal.fire({
                  type: 'success',
                  title: 'Success!',
                  text: 'Your product has been deleted!',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.myList()
              })
              .catch(err => {
                console.log(err)
              })
          }
        })
    },
    myList () {
      this.axios.get(baseUrl + '/products/sell/list', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.sells = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    editItem (id) {
      this.id = id
    },
    previewFile () {
      console.log(this.$refs.myFiles.files)
      this.image = this.$refs.myFiles.files
    }
  },
  created () {
    this.axios.get(baseUrl + '/products/sell/list', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(({ data }) => {
        console.log(data)
        this.sells = data
      })
      .catch(err => {
        console.log(err)
      })
  }

}
</script>

<style>

</style>
