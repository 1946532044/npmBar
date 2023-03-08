<template>
  <el-button v-bind="$attrs"
             :loading="loading"
             @click="handleClick">
    <slot />
  </el-button>
</template>

<script>
export default {
  name: 'ElLoadingButton',
  data () {
    return {
      loading: false,
    }
  },
  methods: {
    handleClick () {
      this.loading = true
      this.$emit('click', () => (this.loading = false))
    },
  },

}
</script>

<style lang="scss" scoped>
</style>
