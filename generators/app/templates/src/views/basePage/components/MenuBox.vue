<template>
  <el-menu :default-active="$route.path"
           class="el-menu-vertical-demo"
           router
           background-color="#28323B"
           text-color="#fff"
           active-text-color="#ffd04b">
    <template v-for="(item,index) in menuArr">
      <MenuContent :key="item.name + item.index"
                   v-if="item.children"
                   :item="item" />
      <el-menu-item :index="item.path"
                    v-else
                    :key="index + item.name">选项8</el-menu-item>
    </template>

  </el-menu>

</template>

<script>
import { mapState } from 'vuex';
export default {
  created () {
  },
  computed: {
    ...mapState('baseMain', ['menuArr'])
  },
  components: {
    MenuContent: () => import('./MenuContent')
  },
  methods: {

  },


}
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  overflow: auto;
  border-right: 1px solid #28323b;
}
</style>