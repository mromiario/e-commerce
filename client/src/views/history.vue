<template>
  <div>
    <div class="container">
    <h1>History</h1>
      <div class = "row">
        <div class = "col-sm">
          <div class = "card mb-5 ">
            <div class = "card-header "><h5>Waiting for payment...</h5></div>
            <noData v-if="this.unpaids.length == 0" />
            <div class = "card-body">
                <div class="card mb-3" v-for="unpaid of unpaids" :key="unpaid._id">
                <h6 class="card-header">Transaction ID : {{unpaid._id}}</h6>
                <div class="row mt-2 ml-4">
                  <img :src="unpaid.product.image" width="100px" height="100px">
                  <div class="card-body">
                    <h6 class="card-title">Transaction Date: {{unpaid.created_at}}</h6>
                    <h6 class="card-title">Title: {{unpaid.product.name}}</h6>
                    <h6 class="card-title">Qty: {{unpaid.qty}}</h6>
                    <h6 class="card-title">Total: {{unpaid.total}} IDR</h6>
                    <h6 class="card-title">Seller: {{unpaid.product.seller.name}}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class = "col-sm">
          <div class = "card mb-5">
            <div class = "card-header"><h5>Ongoing...</h5></div>
            <noData v-if="this.paids.length == 0" />
            <div class = "card-body">
                <div class="card mb-3" v-for="paid of paids" :key="paid._id">
                  <h6 class="card-header">Transaction ID : {{paid._id}}</h6>
                  <div class="row mt-2 ml-4">
                    <img :src="paid.product.image" width="100px" height="100px">
                    <div class="card-body">
                      <h6 class="card-title">Transaction Date: {{paid.created_at}}</h6>
                      <h6 class="card-title">Title: {{paid.product.name}}</h6>
                      <h6 class="card-title">Qty: {{paid.qty}}</h6>
                      <h6 class="card-title">Total: {{paid.total}} IDR</h6>
                      <h6 class="card-title">Seller: {{paid.product.seller.name}}</h6>
                      <a href="#" class="btn btn-primary" @click="finish(paid._id)">Finish Transaction</a>
                    </div>
                  </div>
              </div>
          </div>
        </div>

       </div>

    </div>
      </div>
      </div>

</template>

<script>
import noData from '../components/noData'
const baseUrl = 'http://localhost:3000/api'
export default {
  created () {
    this.fetchData()
  },
  data () {
    return {
      paids: [],
      unpaids: []
    }
  },
  components: {
    noData
  },
  methods: {
    fetchData () {
      this.axios.get(baseUrl + '/transactions/paid', { headers: { token: localStorage.getItem('token') } })
        .then(({ data }) => {
          console.log(data)
          this.paids = data
        })
        .catch(err => {
          console.log(err)
        })

      this.axios.get(baseUrl + '/transactions/unpaid', { headers: { token: localStorage.getItem('token') } })
        .then(({ data }) => {
          console.log(data)
          this.unpaids = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    finish (id) {
      this.$swal.fire(
        { title: 'Have you recieved your package?',
          type: 'question',
          showConfirmButton: true,
          showCancelButton: true
        })
        .then((isConfirm) => {
          if (isConfirm.value) {
            this.axios.patch(baseUrl + '/transactions/finish', { id: id }, { headers: { token: localStorage.getItem('token') } })
              .then(({ data }) => {
                console.log(data)
                this.fetchData()
              })
              .catch(err => {
                console.log(err)
              })
          }
        })
    }
  }

}
</script>

<style>

</style>
