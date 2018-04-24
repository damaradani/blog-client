<template>
  <div class="modal fade" id="editBlogModal" role="dialog">
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
          <button type="button" class="btn btn-default" @click="edit_blog()">create</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EditBlogModal',
  props: [ 'Blogid', 'Btitle', 'Bcontent' ],
  data () {
    return {
      title: '',
      content: '',
      token: ''
    }
  },
  methods: {
    edit_blog: function () {
      let title = this.title
      let content = this.content
      let urlLink = `${this.$baseUrl}/blog/edit/${this.Blogid}`
      // console.log(title)
      // console.log(content)
      // console.log(urlLink)
      // console.log(this.token)

      axios.put(urlLink, { title, content }, { headers: { token: this.token }}
      ).then(res => {
        swal(
          'Edit Article!',
          'Article has been edited',
          'success'
        ).then((value) => {
          window.location.href = "index.html"
        })

      }).catch(err => {
        swal({
           icon: 'error',
           title: 'Oops...',
           text: err
        })
      })
    }
  },
  created: function () {
    this.token = localStorage.getItem('token') 
    console.log('blog id :', this.Blogid)
    console.log('blog title :', this.Btitle)
    console.log('blog content :', this.Bcontent)
    this.title = this.Btitle
    this.content = this.Bcontent
  }//,
  // mounted: function () {
  //   console.log('From Mounted')
  //   console.log('blog id :', this.Blogid)
  //   console.log('blog title :', this.Btitle)
  //   console.log('blog content :', this.Bcontent)
  // }
}
</script>

<style>

</style>
