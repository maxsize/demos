<template>
    <div class="subcontainer">
      <div>
        <p class="subtitle">标题</p>
        <field-input name="title" :info="content" @change="handleChange"/>
        <p class="description">描述</p>
        <field-input name="description" :info="content" @change="handleChange"/>
      </div>
      <div v-if="isRadio">
        <p>学历</p>
        <field-input v-for="(dip, index) in diploma" :name="index" :info="diploma" :key="index" @change="handleChange"/>
      </div>
      <div v-if="isSelect">
        <p>城市</p>
        <field-input v-for="(loc, index) in location" :name="index" :info="location" :key="index" @change="handleChange"/>
      </div>
      <div v-if="isTable">
        <p>题目</p>
        <field-input v-for="(abi, index) in abilities" :name="index" :info="abilities" :key="'abilities'+index" @change="handleChange"/>
        <p>选项</p>
        <field-input v-for="(lv, index) in levels" :name="index" :info="levels" :key="'levels'+index" @change="handleChange"/>
      </div>
    </div>
</template>

<script>
import FieldInput from './FieldInput'

export default {
  name: 'Editor',
  components: {
    FieldInput
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    content: Object
  },
  computed: {
    diploma: function () {
      return this.content.diploma
    },
    location: function () {
      return this.content.location
    },
    abilities: function () {
      return this.content.abilities
    },
    levels: function () {
      return this.content.levels
    },
    isRadio: function () {
      return this.type === 'radio'
    },
    isSelect: function () {
      return this.type === 'select'
    },
    isTable: function () {
      return this.type === 'table'
    }
  },
  methods: {
    handleChange: function (payload) {
      const { key, newValue } = payload
      console.log(key, newValue)
      this.$set(this.content, key, newValue)
    }
  }
}
</script>
