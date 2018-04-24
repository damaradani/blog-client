<template>
  <div class="modal fade" id="newBlogModal" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Create Article</h4>
        </div>
        <div class="modal-body form-group text-left">
          <label for="title">Title :</label>
          <input type="text" class="form-control" v-model="title"><br>
          <label for="content">Content :</label>
          <textarea class="form-control" rows="10" v-model="content" style="resize: none;"></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" @click="new_blog()">create</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'

export default {
  name: 'CreateBlogModal',
  data () {
    return {
      title: '',
      content: '',
      token: ''
    }
  },
  methods: {
    new_blog: function () {
      let title = this.title
      let content = this.content
      let urlLink = `${this.$baseUrl}/blog/create`

      axios.post(urlLink, {title, content}, {headers: {token: this.token}})
        .then(res => {
          swal(
            'New Article!',
            'Article has been created',
            'success'
          ).then((value) => {
            window.location.href = 'index.html'
          })
        }).catch(err => {
          console.log(err)
          swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong'
          })
        })
    }
  },
  created: function () {
    this.token = localStorage.getItem('token')
  }
}
</script>

<style>

</style>
