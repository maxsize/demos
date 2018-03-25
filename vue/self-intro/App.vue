<template>
  <div>
    <div class="main-header">
      <span class="golden">个人简介</span>
      <div class="header-right">
        <div v-if="this.$store.state.user.authorized">欢迎你{{this.$store.state.user.username}}</div>
        <div v-else><a href="#">登陆</a></div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
@import url('./App.css');
</style>
