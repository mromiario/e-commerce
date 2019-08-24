<template>
  <div class="home">
    <img alt="Boo-Koo logo" src="../assets/owl.png">
    <login msg="Welcome to Boo-Koo"/>

  </div>
</template>

<script>
// @ is an alias to /src
import login from './login.vue'

export default {
  name: 'home',
  components: {
    login
  }
}
</script>
