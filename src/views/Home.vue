<template>
  <div class="home">
    <!-- <img src="../assets/logo.png"> -->
    <div class="container text-center">
      <div class="row">
        <div class="col-md-3 col-xs-3">
          <side-bar />
        </div>
        <div class="col-md-9 col-xs-9 text-left">
          <BlogFeed msg="Welcome to Your Vue.js App"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BlogFeed from '@/components/BlogFeed.vue'
import SideBar from '@/components/SideBar.vue'

export default {
  name: 'home',
  components: {
    BlogFeed,
    SideBar
  }
}
</script>

<style>
  .container {
    margin-top: 70px;
  }

  body {
    background-color: #f1f1f1;
  }

  .col-md-9 {
    background-color: white;
  }
</style>
