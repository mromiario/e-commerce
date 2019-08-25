<template>
  <div class="row">
    <div class="col-sm"/>
    <div class="col-sm">
      <div class="card-body" id="formRegister" >
          <form @submit.prevent="register()" >
              <div class="form-group">
                  <label for="name">Name:</label>
                  <input type="text" class="form-control" v-model="name">
              </div>
              <div class="form-group">
                  <label for="email">E-mail:</label>
                  <input type="email" class="form-control" v-model="email">
              </div>
              <div class="form-group">
                  <label for="pwd">Password:</label>
                  <input type="password" class="form-control" v-model="password">
              </div>
              <input type="submit" class="btn btn-default" style="background-color: #0f0e0ec5; color : rgb(255, 255, 255);" value="register">
              <center><span>Already have an account?</span></center>
              <center><span>Login <router-link to='/login'>here</router-link> </span></center>
          </form>
      </div>
    </div>
    <div class="col-sm"/>

  </div>
</template>

<script>
const baseUrl = 'http://localhost:3000/api'
export default {
  name: 'register',
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      this.axios.post(baseUrl + '/users/register', {
        name: this.name,
        email: this.email,
        password: this.password
      })
        .then(({ data }) => {
          console.log(data)
          this.$swal.fire({
            type: 'success',
            title: 'Success!',
            text: 'New user is created! Please, login first.',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push({ path: '/login' })
        })
        .catch(err => {
          console.log(err)
          this.$swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          })
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

a {
  color: #42b983;
}
</style>
