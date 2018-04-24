<template>
  <main role="main" class="container text-center">
    <div class="row">
        <div class="col-md-8 blog-main text-left">
            <div class="blog-post">
                <div class="text-right">
                  <div class="btn-group">
                    <button v-if="userId === ownerId || role === 'admin'" class="btn btn-default btn-sd" data-toggle="modal" data-target="#editBlogModal">Edit Article</button>
                    <button v-if="userId === ownerId || role === 'admin'" class="btn btn-default btn-sd" @click="delete_blog()">Delete Article</button>
                  </div>
                </div>
                <h2 class="blog-post-title">{{ title }}</h2>
                <p class="blog-post-meta">{{ dateFormat(createdAt) }} by <a href="#">{{ author }}</a></p>
                <p>{{ content }}</p>
            </div>
        </div>
    </div>
    <EditBlogModal v-if="title && content" :Blogid="id" :Btitle="title" :Bcontent="content" />
  </main>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'
import EditBlogModal from '@/components/EditBlogModal.vue'

export default {
  name: 'BlogDetail',
  props: [ 'id' ],
  components: {
    EditBlogModal
  },
  data () {
    return {
      title: '',
      content: '',
      createdAt: '',
      author: '',
      token: '',
      ownerId: '',
      userId: '',
      role: ''
    }
  },
  methods: {
    delete_blog: function () {
      let token = localStorage.getItem('token')
      swal({
        title: 'Are you sure?',
        text: `Do you really gonna delete "${this.title}"`,
        icon: 'warning',
        buttons: [true, 'Yes Delete it']
      })
        .then(result => {
          if (result) {
            axios.delete(`${this.$baseUrl}/blog/delete/` + this.id, {headers: {token: token}})
              .then(res => {
                swal(
                  'Deleted!',
                  `${this.title} have been deleted.`,
                  'success'
                ).then((value) => {
                  this.$router.push('/')
                })
              })
              .catch(err => {
                console.log(err)
                swal({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong'
                })
              })
          }
        })
    },
    dateFormat: function (date) {
      let newDate = new Date(date)
      let monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      let year = newDate.getFullYear()
      let month = monthArr[newDate.getMonth()]
      let day = newDate.getDate()

      newDate = `${month} ${day}, ${year}`

      return newDate
    }
  },
  created: function () {
    this.userId = this.$userId
    this.role = this.$role
    axios.get(`${this.$baseUrl}/blog/` + this.id)
      .then(res => {
        this.title = res.data.data.title
        this.content = res.data.data.content
        this.createdAt = res.data.data.createdAt
        this.author = res.data.data.user.name
        this.ownerId = res.data.data.user._id
      })
      .catch(err => {
        console.log(err)
      })
    // cek token and get user data
    let token = localStorage.getItem('token')
    axios.get(`${this.$baseUrl}/cektoken`, {headers: { token }})
      .then(response => {
        let states = response.data.states // token valid ato ga? return true or false
        if (states) {
          this.userId = response.data.user._id
          this.role = response.data.user.role
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
  .row {
    display: flex;
    justify-content: center;
  }

  .blog-main {
    background-color: white;
    width: 85%;
  }

  .btn-group {
    margin-top: 10px;
  }
</style>
