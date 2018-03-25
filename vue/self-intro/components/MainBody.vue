<template>
  <div class="main">
    <div class="wrapper">
      <div class="App">
        <header class="App-header">
          <h1 class="App-title">介绍一下你自己</h1>
        </header>
        <div class="App-container">
          <div :style="{paddingLeft:'20px', paddingTop:'1px'}"><h3>个人登记表单</h3></div>
          <hr/>
          <form>
            <parameter-comp v-for="(param, index) in this.$store.state.parameters" :info="param" :key="index"/>
          </form>
          <hr/>
          <div :style="{paddingLeft:'20px',paddingBottom:'10px'}">
            <button>提交</button>
          </div>
        </div>
      </div>
      <side/>
    </div>
  </div>
</template>

<script>
import ParameterComp from '../components/ParameterComp'
import Side from '../components/Side'

export default {
  name: 'MainBody',
  components: {
    ParameterComp,
    Side
  },
  computed: {
    selectedItem () {
      return this.$store.state.selectedIndex >= 0 ? this.store.state.parameters[this.store.state.selectedIndex] : {}
    }
  }
}
</script>

<style>
@import url('../App.css');
</style>
