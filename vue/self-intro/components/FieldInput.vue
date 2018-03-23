<template>
    <div :style="{display:'inline-block'}">
        <input type='text' :value="getValue" :name="name" @change="handleChange"/>
    </div>
</template>

<script>
import { MUT_CHANGE_VALUE } from "../store/index";

export default {
  name: 'FieldInput',
  props: ['name', 'info'],
  methods: {
    handleChange: function (e) {
      // this.$set(this.info, this.name, e.target.value)
      this.$store.commit(
        MUT_CHANGE_VALUE,
        {
          data: this.info,
          key: this.name,
          newValue: e.target.value
        }
      )
    }
  },
  computed: {
    getValue: function () {
      return this.info ? this.info[this.name] : ''
    }
  }
}
</script>
