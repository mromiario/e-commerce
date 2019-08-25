<template>
  <div class="home">
    <products v-if="!admin" />
    <adminPage v-else/>

  </div>
</template>

<script>
// @ is an alias to /src
import products from './products.vue'
import adminPage from './admin.vue'

export default {
  props: ['admin'],
  name: 'home',
  components: {
    products,
    adminPage
  }
}
</script>
