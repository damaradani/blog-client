<template>
  <div class="modal fade" id="loginModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Login</h4>
          </div>
          <div class="modal-body form-group">
            <label for="email">Email :</label>
            <input type="text" class="form-control" v-model="email">
            <label for="password">Password :</label>
            <input type="password" class="form-control" v-model="password">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" style="width:100%;" @click="login()">Login</button>
            <!-- <br><p class="text-center" style="margin-top:10px;">Or Login with Social Media</p> -->
            <div class="text-center">
              <!-- <div scope="public_profile,email" onlogin="checkLoginState();"
              class="fb-login-button" data-max-rows="1" data-size="large"
              data-button-type="login_with" data-show-faces="false"
              data-auto-logout-link="false" data-use-continue-as="false"></div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'

export default {
  name: 'LoginModal',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      let email = this.email
      let password = this.password
      let urlLink = `${this.$baseUrl}/signin`
      axios.post(urlLink, {email, password})
        .then(response => {
          if (response.data.message !== 'User Login Succesfully') {
            swal({
              type: 'error',
              title: 'Oops...',
              text: 'something wrong!'
            })
          } else {
            localStorage.setItem('token', response.data.token)
            this.$isLogin = true
            swal(
              'Good job!',
              'You log in successfully!',
              'success'
            ).then(res => {
              window.location.href = 'index.html'
            })
          }
        })
        .catch(err => {
          console.log(err)
          swal({
            type: 'error',
            title: 'Oops...',
            text: 'Email / Password is wrong!'
          })
        })
    }
  }
}
</script>

<style>

</style>
