<template>
    <div :class="getStyle" @click="handleClick">
        <p class="subtitle">{{title}}</p>
        <p class="description">{{description}}</p>
        <CommonForm :type="type"
                    :location="location"
                    :abilities="abilities"
                    :levels="levels"
                    :diploma="diploma"/>
    </div>
</template>

<script>
import CommonForm from './CommonForm'
import { MUT_SELECT } from '../store/index'

export default {
  name: 'ParameterComp',
  components: {
    CommonForm,
  },
  props: {
    info: Object,
  },
  methods: {
    handleClick: function () {
      // this.$emit('selected', this.$vnode.key)
      this.$store.commit(MUT_SELECT, this.$vnode.key)
    }
  },
  computed: {
    getStyle: function () {
      return this.selectedIndex === this.$vnode.key ? 'subcontainer-highlight' : 'subcontainer'
    },
    selectedIndex () { return this.$store.state.selectedIndex },
    type: function () { return this.info.type },
    title: function () { return this.info.title },
    description: function () { return this.info.description },
    location: function () { return this.info.location },
    abilities: function () { return this.info.abilities },
    levels: function () { return this.info.levels },
    diploma: function () { return this.info.diploma }
  }
}
</script>

