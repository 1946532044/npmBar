<template>
  <el-submenu :index="item.name"
              v-if="item.children"
              :key=" item.name">
    <template slot="title">
      <i class="el-icon-location"
         style="margin-right:2px"></i>
      <span>{{item.name}}</span>
    </template>
    <template v-for="(subItem,index) in item.children">
      <MenuContent v-if="subItem.children"
                   :item="subItem"
                   :key="item.name + item.path + index" />
      <el-menu-item v-else
                    :key="item.name + item.path + index"
                    :index="subItem.path">
        <i style="display:inline-block;width:24px;margin-right:2px"></i>
        <span>{{subItem.name}}</span>
      </el-menu-item>
    </template>
  </el-submenu>
</template>

<script>
export default {
  name: 'MenuContent',
  props: {
    item: {
      type: Object
    }
  },
  data () {
    return {

    };
  },
  created () {

  },
  mounted () {

  },
  methods: {

  },
  components: {
    MenuContent: () => import('./MenuContent'),
  }
}
</script>

<style lang='scss' scoped>
/deep/ .el-menu-item {
}
</style>