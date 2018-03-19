<template>
  <div>
    <div class="main-header">
      <span class="golden">个人简介</span>
      <div class="header-right">
        <button>下载APP</button>
        &nbsp;&nbsp;
        <a href="#">登陆</a>
      </div>
    </div>
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
              <parameter-comp v-for="(param, index) in parameters" :selectedIndex="selectedIndex" :info="param" :key="index" @selected="handleSelect"/>
            </form>
            <hr/>
            <div :style="{paddingLeft:'20px',paddingBottom:'10px'}">
              <button>提交</button>
            </div>
          </div>
        </div>
        <side :info="selectedItem"/>
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import ParameterComp from './components/ParameterComp'
import Side from './components/Side'

export default {
  name: 'App',
  components: {
    ParameterComp,
    Side
  },
  data: function () {
    return {
      selectedIndex: -1,
      parameters: [
        {
          type:'text',
          title:'留下你的大名吧',
          description:'请告诉我你的大名',
        },
        {
          type:'radio',
          title:'你的最高学历',
          description:'请告诉我你的最高学历，我们想了解一下',
          diploma:[
            '专科',
            '本科',
            '硕士',
            '博士',
          ]
        },
        {
          type:'select',
          title:'你在哪里呢',
          // description:'22',
          location:[
            '北京',
            '成都',
            '上海',
          ]
        },
        {
          type:'table',
          title:'自我评估',
          // description:'11',
          abilities:[
            '沟通技巧',
            '时间观念',
            '技能熟练',
          ],
          levels:[
            '较差',
            '一般',
            '还不错',
            '这是我的强项',
          ]
        }
      ]
    }
  },
  methods: {
    handleSelect: function (index) {
      this.selectedIndex = index
    }
  },
  computed: {
    selectedItem: function () {
      return this.selectedIndex >= 0 ? this.parameters[this.selectedIndex] : {}
    }
  }
}
</script>

<style>
@import url('./App.css');
</style>
