<template>
  <select>
    <option v-for="(loc, index) in location" :value="index" :key="index">{{loc}}</option>
  </select>
</template>

<script>
export default {
  name: 'SelectInput',
  props: {
    location: Array
  }
}
</script>
