<template>
  <div>
    <div class="container">
      <h1>Admin Page</h1>
        <div class = "row">
          <div class = "col-sm">
            <div class = "card mb-5 ">
              <div class = "card-header "><h5>All Transactions</h5></div>
              <div class = "card-body">
                  <div class="card mb-3" v-for="unpaid of transactions" :key="unpaid._id">
                  <h6 class="card-header">Transaction ID : {{unpaid._id}}</h6>
                  <div class="row mt-2 ml-4">
                    <div class="card-body">
                      <h6 class="card-title">Transaction Date: {{unpaid.created_at}}</h6>
                      <h6 class="card-title">User: {{unpaid.User._id}} - {{unpaid.User.name}}</h6>
                      <h6 class="card-title">Qty: {{unpaid.qty}}</h6>
                      <h6 class="card-title">Total: {{unpaid.total}} IDR</h6>
                      <h6 class="card-title" v-if="unpaid.product">Seller: {{unpaid.product.seller._id}} - {{unpaid.product.seller.name}} </h6>
                      <b>Payment Status : {{unpaid.paymentStatus}}</b><br>
                      <b>Finish Status : {{unpaid.finishStatus}}</b><br>
                      <a href="#" v-if="!unpaid.paymentStatus" class="btn btn-primary mt-3" @click="confirm(unpaid._id)">Confirm Payment</a>
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
const baseUrl = 'http://localhost:3000/api'
export default {
  created () {
    this.fetchData()
  },
  data () {
    return {
      transactions: null

    }
  },
  methods: {
    confirm (id) {
      this.axios.patch(baseUrl + '/transactions/confirm', { id: id }, { headers: { token: localStorage.getItem('token') } })
        .then(({ data }) => {
          console.log(data)
          this.fetchData()
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchData () {
      this.axios.get(baseUrl + '/transactions/', { headers: { token: localStorage.getItem('token') } })
        .then(({ data }) => {
          console.log(data)
          this.transactions = data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

}
</script>

<style>

</style>
