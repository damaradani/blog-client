<template>
  <div class="modal fade" id="signUpModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Sign Up</h4>
          </div>
          <div class="modal-body form-group">
            <label for="SUname">Name :</label><small id="SUnameCek"></small>
            <input type="text" v-model="regis_name" class="form-control" id="SUname">

            <label for="SUemail">Email :</label><small id="SUemailCek"></small>
            <input type="text" v-model="new_email" class="form-control" id="SUemail">

            <label for="SUpassword">Password :</label><small id="SUpasswordCek"></small>
            <input type="password" v-model="new_password" class="form-control" id="SUpassword">

            <label for="SUconPass">Confirm Password :</label><small id="SUconPassCek"></small>
            <input type="password" v-model="new_conPass" class="form-control" id="SUconPass">
          </div>
          <div class="modal-footer">
            <button type="button" v-show="isName && isEmail && isPwd && isConPwd" class="btn btn-default" @click="signup()">Sign Up</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'

export default {
  name: 'SignUpModal',
  data () {
    return {
      regis_name: '',
      new_email: '',
      new_password: '',
      new_conPass: '',
      // kondisi apakah pengecekan nama, email dan password sudah sukses
      isName: false,
      isEmail: false,
      isPwd: false,
      isConPwd: false
    }
  },
  methods: {
    signup: function (payload) {
      let name = this.regis_name
      let email = this.new_email
      let password = this.new_password
      let urlLink = `${this.$baseUrl}/signup`
      axios.post(urlLink, {name, email, password})
        .then(function (res) {
          swal(
            'Sign Up!',
            'You sign up successfully!',
            'success'
          ).then((value) => {
            window.location.href = 'index.html'
          })
        })
        .catch(function (err) {
          console.log(err)
          swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Email is not available!'
          })
        })
    }
  },
  watch: {
    regis_name: function () {
      if (this.regis_name.length > 4) {
        // eslint-disable-next-line
        $('#SUnameCek').text('')
        // eslint-disable-next-line
        $('#SUname').css({'border-color': 'green', 'border-solid': 'bold', 'border-width': '3px'})
        this.isName = true
      } else {
        // eslint-disable-next-line
        $('#SUnameCek').text('Name is Required && minimal 4 character').css('color','red')
        // eslint-disable-next-line
        $('#SUname').css({'border-color': 'red', 'border-solid': 'bold', 'border-width': '3px'})
        this.isName = false
      }
    },
    new_email: function () {
      let email = this.new_email
      // eslint-disable-next-line
      let regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      let checkEmail = regEx.test(String(email).toLowerCase())
      if (checkEmail) {
        // eslint-disable-next-line
        $('#SUemailCek').text('')
        // eslint-disable-next-line
        $('#SUemail').css({'border-color': 'green', 'border-solid': 'bold', 'border-width': '3px'})
        this.isEmail = true
      } else {
        // eslint-disable-next-line
        $('#SUemailCek').text('Email Format is Wrong!').css('color','red')
        // eslint-disable-next-line
        $('#SUemail').css({'border-color': 'red', 'border-solid': 'bold', 'border-width': '3px'})
        this.isEmail = false
      }
    },
    new_password: function () {
      let pwd = this.new_password
      if (pwd.length > 6) {
        let numInPwd = pwd.match(/[0-9]/g)
        if (numInPwd) {
          // eslint-disable-next-line
          $('#SUpasswordCek').text('')
          // eslint-disable-next-line
          $('#SUpassword').css({'border-color': 'green', 'border-solid': 'bold', 'border-width': '3px'})
          this.isPwd = true
        } else {
          // eslint-disable-next-line
          $('#SUpasswordCek').text('Password must contained number!').css('color','red')
          // eslint-disable-next-line
          $('#SUpassword').css({'border-color': 'red', 'border-solid': 'bold', 'border-width': '3px'})
          this.isPwd = false
        }
      } else {
        // eslint-disable-next-line
        $('#SUpasswordCek').text('Password minimal 6 digit!').css('color','red')
        // eslint-disable-next-line
        $('#SUpassword').css({'border-color': 'red', 'border-solid': 'bold', 'border-width': '3px'})
        this.isPwd = false
      }
    },
    new_conPass: function () {
      if (this.new_conPass === this.new_password) {
        // eslint-disable-next-line
        $('#SUconPassCek').text('')
        // eslint-disable-next-line
        $('#SUconPass').css({'border-color': 'green', 'border-solid': 'bold', 'border-width': '3px'})
        this.isConPwd = true
      } else {
        // eslint-disable-next-line
        $('#SUconPassCek').text('password not match').css('color','red')
        // eslint-disable-next-line
        $('#SUconPass').css({'border-color': 'red', 'border-solid': 'bold', 'border-width': '3px'})
        this.isConPwd = false
      }
    }
  }
}
</script>

<style>

</style>
