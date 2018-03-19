<template>
  <div class="ui-type" @click="handleClick" :style="style">{{name}}</div>
</template>

<script>
export default {
  name: 'TypeItem',
  props: {
    selectedType: String,
    type: String,
    name: String
  },
  methods: {
    handleClick: function () {
      this.$emit('change', this.type)
    }
  },
  computed: {
    style: function () {
      return this.type === this.selectedType ? {backgroundColor : '#b9cbe6'} : {}
    }
  }
}
</script>
