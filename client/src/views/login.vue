<template>
  <div class="row mt-4">
    <div class="col-sm"/>
    <div class="col-sm">
      <form @submit.prevent="login" >
        <div class="form-group">
            <label for="email">E-mail:</label>
            <input type="email" class="form-control" v-model="email">
        </div>
        <div class="form-group">
            <label for="pwd">Password:</label>
            <input type="password" class="form-control" v-model="pwd">
        </div>
        <input type="submit" class="btn btn-default" style="background-color: #0f0e0ec5; color : rgb(255, 255, 255);" value="login">
        <center> <div id = "google-signin-button"></div></center>
        <center><span>Doesn't have an account?</span></center>
        <center><span>Register <router-link to='/register'>here</router-link> </span></center>
      </form>
    </div>
    <div class="col-sm"/>

  </div>
</template>

<script>
const baseUrl = 'http://localhost:3000/api'
export default {
  name: 'login',
  props: {
    msg: String
  },
  data () {
    return {
      email: '',
      pwd: '',
      admin: false
    }
  },
  methods: {
    login () {
      this.axios.post(baseUrl + '/users/login', {
        email: this.email,
        password: this.pwd
      })
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('token', data.token)
          this.$swal.fire({
            type: 'success',
            title: 'Success!',
            text: 'Login Success!',
            showConfirmButton: false,
            timer: 1500
          })
          this.checkAdmin()
        })
        .catch(err => {
          console.log(err)
          this.$swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Invalid username/password!'
          })
        })
    },
    checkAdmin () {
      this.axios.get(baseUrl + '/users/', { headers: {
        token: localStorage.getItem('token')
      } })
        .then(({ data }) => {
          if (data.email === process.env.VUE_APP_ADMIN) {
            console.log('sama')
            this.admin = true
            console.log(this.admin)
          } else {
            this.admin = false
          }
          this.$router.push('/')
          this.$emit('changeLoginStatus', true)
          if (this.admin) {
            console.log('ini dakam if admin')
            this.$emit('adminTrue', true)
          }
        })
        .catch(err => {
          console.log(err)
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
