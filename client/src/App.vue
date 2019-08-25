<template>
  <div id="app">
    <div id="nav" class="pb-4" v-if="login">
      <nav class="navbar navbar-light bg-light">
        <router-link to="/"><a class="navbar-brand"> <img alt="Boo-Koo logo" src="./assets/owl.png" class="responsive"><img src="./assets/logo.png" width="200px"></a></router-link>
        <div class="row">
              <router-link v-if="!admin" to="/products"><h5 class="ml-4 mr-4" style="color:#00c049">Products</h5></router-link>
              <router-link  v-if="!admin" to="/sell-products"><h5 class="ml-4 mr-4" style="color:#00c049">Seller</h5></router-link>
              <router-link  v-if="!admin" to="/my-profile"><h5 class="ml-4 mr-4" style="color:#00c049">My Cart</h5></router-link>
              <router-link  v-if="!admin" to="/history"><h5 class="ml-4 mr-4" style="color:#00c049">History</h5></router-link>
            <router-link  v-if="admin" to="/admin"><h5 class="ml-4 mr-4" style="color:#00c049">Admin Page</h5></router-link>
            <a href='#' @click="signOut()"><h5 class="ml-4 mr-4" style="color:#00c049">Sign Out</h5></a>
        </div>
      </nav>

    </div>
    <div class="pb-5" v-else>
      <nav class="navbar navbar-light bg-light">
        <router-link to="/"><a class="navbar-brand"> <img alt="Boo-Koo logo" src="./assets/owl.png" class="responsive"><img src="./assets/logo.png" width="200px"></a></router-link>
        <div class="row">
            <router-link to="/register"><h5 style="color:#00c049">Register</h5></router-link>
            <router-link to="/login"><h5 class="ml-4 mr-4" style="color:#00c049">Sign In</h5></router-link>
        </div>
      </nav>
    </div>
    <router-view @adminTrue="adminChange()"  @changeLoginStatus="changeLogin()" v-bind:login="login"  v-bind:admin="admin" style="min-height: 70vh"/>
    <myfooter/>
  </div>
</template>

<script>
import myfooter from './components/footer'
const baseUrl = 'http://localhost:3000/api'
export default {
  data () {
    return {
      login: false,
      name: '',
      admin: false
    }
  },
  methods: {
    signOut () {
      this.$swal.fire(
        { title: 'Are you sure want to Sign Out?',
          type: 'question',
          showConfirmButton: true,
          showCancelButton: true
        })
        .then((isConfirm) => {
          if (isConfirm.value) {
            localStorage.clear()
            this.login = false
            this.name = ''
            this.admin = false
            this.$router.push('/')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    changeLogin () {
      console.log('masuk login')
      this.login = true
    },
    adminChange () {
      console.log('masuk admin')
      this.admin = true
    }
  },
  components: {
    myfooter
  },
  created () {
    if (localStorage.getItem('token')) {
      this.axios.get(baseUrl + '/users/', { headers: {
        token: localStorage.getItem('token')
      } })
        .then(({ data }) => {
          this.name = data.name
          if (data.email === process.env.VUE_APP_ADMIN) {
            this.admin = true
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.login = true
    }
  }
}
</script>

<style scoped>
.responsive {
  width: 100px;
  height: auto;
}
</style>
