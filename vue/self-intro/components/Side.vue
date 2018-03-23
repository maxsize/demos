<template>
    <div class="side">
        <header class="App-header">
        添加字段
        </header>
        <type-selector :type="infoType" @change="handleTypeChange"/>
        <header class="App-header">
        编辑字段
        </header>
        <editor :type="infoType" :content="info"/>
    </div>
</template>

<script>
import TypeSelector from './TypeSelector'
import Editor from './Editor'
import { MUT_CHANGE_TYPE } from "../store/index";

export default {
  name: 'Side',
  components: {
    TypeSelector,
    Editor
  },
  data: function () {
    return {
      selectedType: '',
    }
  },
  methods: {
    handleTypeChange: function (type) {
      this.selectedType = type
      // this.initData(type)
      // this.$set(this.info, 'type', type)
      this.$store.commit(MUT_CHANGE_TYPE, type)
    }
  },
  computed: {
    info () {
      const { selectedIndex, parameters } = this.$store.state
      return selectedIndex >= 0 ? parameters[selectedIndex] : null
    },
    infoType: function () {
      return this.info ? this.info.type : undefined
    }
  }
}
</script>
