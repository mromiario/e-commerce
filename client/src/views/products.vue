<template>
    <div class="container mb-2" id="top">
      <div class="column">
          <div class="pb-2">
            <input class="form-control" id="myInput" type="text" placeholder="Search by Book Title..." v-model="search">
          </div>
          <div class="column pb-2">
             <router-view :login="login"></router-view>
          </div>
          <div class="row">
            <div v-for="product in filteredCommands" :key="product._id">
              <div class="card  mt-2 ml-2 mb-2 mr-2" style="width: 16.8rem;">
                <img class="card-img-top" :src="product.image" height="200px" width="200px" alt="No-Image">
                <div class="card-body">
                  <h6 class="card-title">{{product.name}}</h6>
                  <h6 class="card-title">Price: {{product.price}} IDR</h6>
                  <p class="card-text">Seller: {{product.seller.name}}</p>
                  <button><router-link :to=" `/products/${product._id}` " style="color:white">See detail</router-link></button>
                </div>
            </div>
            </div>
          </div>
      </div>
    </div>

</template>

<script>
const baseUrl = 'http://localhost:3000/api'
export default {
  name: 'products',
  props: ['login'],
  data () {
    return {
      products: [],
      search: ''
    }
  },
  methods: {

  },
  created () {
    this.axios.get(baseUrl + '/products')
      .then(({ data }) => {
        this.products = data
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  computed: {
    filteredCommands: function () {
      return this.products.filter(item => {
        return item.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
}
</script>
<style>
  button{
    background-color: #00c049
  }
</style>
