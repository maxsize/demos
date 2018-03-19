<template>
    <div :style="{display:'inline-block'}">
        <input type='text' :value="getValue" :name="name" @change="handleChange"/>
    </div>
</template>

<script>
export default {
  name: 'FieldInput',
  props: ['name', 'info'],
  methods: {
    handleChange: function (e) {
      this.$set(this.info, this.name, e.target.value)
    }
  },
  computed: {
    getValue: function () {
      return this.info ? this.info[this.name] : ''
    }
  }
}
</script>
