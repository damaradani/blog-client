<template>
  <div id="app">

    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#myPage">Simple Blog</a>
        </div>
        <div class="collapse navbar-collapse" id="myNavbar">
          <ul class="nav navbar-nav navbar-right">
            <li><router-link to="/" class="nav-link" >Home</router-link></li>
            <!-- <li><router-link to="/about" class="nav-link">About</router-link></li> -->
            <li><a href="#" v-if="isLogin" data-toggle="modal" data-target="#newBlogModal">Create Article</a></li>
            <li>
              <a href="#" v-if="!isLogin" data-toggle="modal" data-target="#loginModal">Login</a>
              <a href="#" v-else @click="logout()">Logout</a></li>
            <li><a href="#" v-if="!isLogin" data-toggle="modal" data-target="#signUpModal">Sign Up</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <login-modal />
    <SignUpModal />
    <CreateBlogModal />
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginModal from '@/components/LoginModal.vue'
import SignUpModal from '@/components/SignUpModal.vue'
import CreateBlogModal from '@/components/CreateBlogModal.vue'
import axios from 'axios'
import swal from 'sweetalert'

export default {
  name: 'apps',
  components: {
    LoginModal,
    SignUpModal,
    CreateBlogModal
  },
  data () {
    return {
      isLogin: false
    }
  },
  methods: {
    logout: function () {
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        buttons: [true, 'Yes, Log out!']
      }).then(result => {
        if (result) {
          swal(
            'Log out!',
            'You have been log out.',
            'success'
          ).then(result => {
            localStorage.removeItem('token')
            this.isLogin = false
            this.$isLogin = false
            // window.location.href= "index.html"
            this.$route.push('/')
          })
        }
      })
    }
  },
  created: function () {
    let token = localStorage.getItem('token')
    axios.get(`${this.$baseUrl}/cektoken`, {headers: { token }})
      .then(response => {
        let states = response.data.states // token valid ato ga? return true or false
        this.$isLogin = states // buat global
        this.isLogin = states
        if (states) {
          this.$userId = response.data.user._id
          this.$role = response.data.user.role
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style>
#app {
  font-family: 'Playfair Display', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar {
  color: aliceblue;
  background-color: #e3f2fd;
  margin-bottom: 50px;
}

</style>
