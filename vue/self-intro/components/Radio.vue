<template>
  <div :style="{marginTop:'10px'}">
    <span v-for="(dip, index) in diploma" :key="index">
        <input type="radio" name="diploma" :id="dip+index" :value="dip"/>
        <label :for="'dip'+index">{{dip}}</label>
    </span>
</div>
</template>

<script>
export default {
  name: 'Radio',
  props: {
    diploma: Array
  }
}
</script>
