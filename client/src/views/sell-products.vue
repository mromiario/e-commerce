<template>
    <div>
    <h1>Sell Something...</h1>
    <form @submit.prevent="sellProduct()" >
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
    <h1>My Product to sell</h1>
        <ul>
            <li v-for="sell in sells" :key="sell._id">
            Name : {{sell.name}}<br>
            Price : {{sell.price}}<br>
            <a href='#' @click="deleteItem(sell._id)">Delete<br> </a>
            <a href='#' @click="editItem(sell._id)">Edit</a>
            </li>
        </ul>
            <editPage v-if="edit" v-bind:id="id" ></editPage>
    </div>

</template>

<script>
import editPage from './editPage.vue'
const baseUrl = 'http://localhost:3000/api'
export default {
  data () {
    return ({
      name: '',
      stock: '',
      price: '',
      id: null,
      sells: [],
      edit: false,
      image: ''
    })
  },
  components: {
    editPage
  },
  methods: {
    sellProduct () {
      var bodyFormData = new FormData();
      bodyFormData.append('image', this.image[0]); 
      this.axios({
        method : 'POST',
        url : baseUrl+'/images/upload',
        data : bodyFormData,
        config : {headers: {
            token : localStorage.getItem('token')
        }}
      })
      .then(({data})=>{
        console.log(data);
        this.image = data.link
        console.log('iniii link image',this.image);
        return this.axios.post(baseUrl + '/products', {
          name: this.name,
          stock: this.stock,
          price: this.price,
          image: this.image
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
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteItem (id) {
      this.axios.delete(baseUrl + '/products/' + id,
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }
      )
        .then(({ data }) => {
          this.myList()
        })
        .catch(err => {
          console.log(err)
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
      this.edit = !this.edit
      this.id = id
    },
    previewFile(){
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
