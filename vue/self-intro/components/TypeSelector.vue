<template>
    <div>
        <TypeItem :selectedType="type" @change="handleChange" type='text' name='单行文本'/>
        <TypeItem :selectedType="type" @change="handleChange" type='table' name='矩阵单选'/>
        <TypeItem :selectedType="type" @change="handleChange" type='radio' name='单项选择'/>
        <TypeItem :selectedType="type" @change="handleChange" type='select' name='下拉框'/>
    </div>
</template>

<script>
import TypeItem from './TypeItem'
export default {
  name: 'TypeSelector',
  components: {
    TypeItem
  },
  props: {
    type: String
  },
  methods: {
    handleChange: function (type) {
      this.$emit('change', type)
    }
  }
}
</script>
