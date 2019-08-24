<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/products">Products</router-link> |
      <router-link to="/sell-products">Sell</router-link> |
      <router-link to="/my-profile">My Profile</router-link> |
      <router-link to="/about">About</router-link> |
      <a href='#' @click="signOut()">Sign Out</a>

    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    signOut(){
    this.$swal.fire(
    {   title : "Are you sure want to Sign Out?",
        type : "question",
        showConfirmButton : true,
        showCancelButton : true,
    })
    .then((isConfirm)=>{
        if(isConfirm.value){
            localStorage.clear()
        }
    })

    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
