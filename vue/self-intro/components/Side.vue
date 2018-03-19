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

export default {
  name: 'Side',
  components: {
    TypeSelector,
    Editor
  },
  props: {
    info: Object
  },
  data: function () {
    return {
      selectedType: '',
    }
  },
  methods: {
    handleTypeChange: function (type) {
      this.selectedType = type
      this.initData(type)
      this.$set(this.info, 'type', type)
    },
    initData: function (type)
    {
      if (!this.info) return;
      switch (type) {
        case 'radio':
          if (this.info.diploma) break;
          this.$set(this.info, 'diploma', ['dip1', 'dip2', 'dip3', 'dip4']);
          break;
        case 'select':
          if (this.info.location) break;
          this.$set(this.info, 'location', ['loc1', 'loc2', 'loc3']);
          break;
        case 'table':
          if (this.info.abilities || this.info.levels) break;
          this.$set(this.info, 'abilities', ['abi1', 'abi2', 'abi3', 'abi4']);
          this.$set(this.info, 'levels', ['lv1', 'lv2', 'lv3']);
          break;
        default:
          break;
      }
    }
  },
  computed: {
    infoType: function () {
      return this.info.type
    }
  }
}
</script>
