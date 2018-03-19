<template>
  <radio v-if="isRadio" :diploma="diploma"/>
  <select-input v-else-if="isSelect" :location="location"/>
  <table-input v-else-if="isTable" :abilities="abilities" :levels="levels"/>
  <text-input v-else/>
</template>

<script>
import TextInput from './TextInput'
import Radio from './Radio'
import SelectInput from './SelectInput'
import TableInput from './TableInput'

export default {
  name: 'CommonForm',
  components: {
    TextInput,
    Radio,
    SelectInput,
    TableInput
  },
  props: {
    type: String,
    diploma: Array,
    location: Array,
    abilities: Array,
    levels: Array,
  },
  computed: {
    isRadio: function () {
      return this.type === 'radio'
    },
    isSelect: function () {
      return this.type === 'select'
    },
    isTable: function () {
      return this.type === 'table'
    }
  }
}
</script>
