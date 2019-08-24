<template>
    <ul>
        <li v-for="product in products" :key="product._id">
            <router-link :to=" `/products/${product._id}` ">{{product.name}}</router-link>
        </li>
        <router-view></router-view>
    </ul>

</template>

<script>
const baseUrl = 'http://localhost:3000/api'
export default {
  name: 'products',
  data () {
    return {
      products: []
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
  }
}
</script>
<style>
</style>
