<template>
  <div>
    <div class="card flex-md-row mb-4 box-shadow h-md-250" v-for="(blogFeed, index) in blogFeeds" :key="index">
      <div class="card-body d-flex flex-column align-items-start">
        <h3>
          <a class="text-dark" href="#">{{ blogFeed.title }}</a>
        </h3>
        <h5 class="text-muted"><span class="glyphicon glyphicon-time"></span> {{ dateFormat(blogFeed.createdAt) }}</h5>
        <p class="card-text mb-auto">{{ content_preview(blogFeed.content) }}</p>
        <!--<a href="#">Continue reading</a> -->
        <router-link :to="{name: 'BlogDetail', params: {id: blogFeed._id}}">Continue reading</router-link>
      </div>
      <!-- <img class="card-img-right flex-auto d-none d-md-block" data-src="holder.js/200x250?theme=thumb" alt="Card image cap"> -->
      <hr>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BlogFeed',
  props: {
    msg: String
  },
  data () {
    return {
      blogFeeds: []
    }
  },
  methods: {
    content_preview: function (content) {
      let words = content.split(' ')
      return words.slice(0, 20).join(' ')
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
  created () {
    let getBlogLink = `${this.$baseUrl}/blog/all`
    axios.get(getBlogLink)
      .then(response => {
        // console.log(response.data.data)
        this.blogFeeds = response.data.data.reverse()
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
