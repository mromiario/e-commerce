<template>
    <div>
        <h1>My Profile</h1>
        <span>{{name}}</span><br>
        <span>{{email}}</span><br>
        <span v-for="cart in carts" :key="cart._id">
            <p>{{cart._id}}</p>
            <p>{{cart.name}}</p>
            <p>{{cart.price}}</p>
            <p>{{cart.seller}}</p>
            <hr>
            <a href="#" @click="deleteCart(cart._id)">Delete Cart</a> <br>
            <router-link :to=" `/buy/${cart._id}` ">Buy this book</router-link>
            <hr>
            <hr>
        </span><br>
        <a href = "#" @click="checkOutCart()">Checkout Chart</a>
        
    </div>
</template>

<script>
const baseUrl = 'http://localhost:3000/api'
export default {
    data () {
        return({
            name : "",
            email : "",
            carts : []
        })
    },
    methods : {
        fetchCart(){
            this.axios.get(baseUrl+'/users/', {headers : {
                token : localStorage.getItem('token')
            }})
            .then(({data})=>{
                console.log(data);
                this.name = data.name,
                this.email = data.email,
                this.carts = data.cart
            })
            .catch(err=>{
                console.log(err);
            })
        },
        deleteCart (id) {
            this.axios.patch(baseUrl + '/cart/delete', 
            {
                cart : id
            } ,
            {headers : {
                token : localStorage.getItem('token')
            }})
            .then(({data})=>{
                console.log(data);
                this.fetchCart()
            })
            .catch(err=>{
                console.log(err);
            })
        },
        checkOutCart () {
            this.axios.patch(baseUrl + '/cart/checkout', null, 
            {headers : {
                token : localStorage.getItem('token')
            }})
            .then(({data})=>{
                console.log(data);
                this.fetchCart()
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
    ,created () {
        this.fetchCart()
    }

}
</script>

<style>

</style>