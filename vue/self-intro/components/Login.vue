<template>
  <div class="loginContainer">
    <div>
      <div class="loginTab">
        <div class="tab" :style="getStyle(0)" @click="selectTab(0)">Login</div>
        <div class="tab" :style="getStyle(1)" @click="selectTab(1)">Register</div>
      </div>
      <div class="loginPanel">
        <form>
          <p>{{error}}</p>
          <input required type="text" id="username" placeholder="Input your name here" v-model="username">
          <p><button @click="login" type="button">Login</button></p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { MUT_LOGIN } from "../store/index";
export default {
  name: 'Login',
  data: function () {
    return {
      activeIndex: 0,
      username: '',
      error: ''
    }
  },
  computed: {
  },
  methods: {
    getStyle(index) {
      return index === this.activeIndex ? {backgroundColor:'white', color:'#0080ff'} : {}
    },
    selectTab(index) {
      if (this.activeIndex === index) return;
      this.activeIndex = index;
    },
    login () {
      if (this.username)
      {
        this.$store.commit(MUT_LOGIN, {username:this.username, router:this.$router})
        return true;
      }
      this.error = '* Name is required.'
    }
  }
}
</script>

<style>
@import url('../css/login.css');
</style>

