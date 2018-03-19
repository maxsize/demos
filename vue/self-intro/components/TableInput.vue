<template>
  <table class="table">
    <tr class="row-title">
        <td></td>
        <td v-for="(lv, index) in levels" :key="index">{{lv}}</td>
    </tr>
    <tr v-for="(abi, index) in abilities" :key="index" class="row-content">
        <td>{{abi}}</td>
        <td v-for="(lv, index) in levels" :key="index">
            <input type="radio" name="self-ass1" :id="'ass'+index" :value="index"/>
        </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'TableInput',
  props: {
    abilities: Array,
    levels: Array
  }
}
</script>
