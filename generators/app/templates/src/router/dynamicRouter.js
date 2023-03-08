// 动态路由添加菜单
export default [
  {
    name: '商品管理',
    icon: 'el-icon-s-goods',
    children: [

      {
        path: '/goodsData',
        name: "商品数据",
      },
      {
        path: '/storeList',
        name: "商品列表",
      },
      {
        name: "基础数据",
        children: [
          {
            path: '/goodsType',
            name: "商品种类",
          }
        ]
      },

    ]
  },
  {
    name: '工艺管理',
    icon: 'el-icon-s-goods',
    children: [

      {
        path: '/structuredCraft',
        name: "结构化工艺编辑器",
      },
      {
        path: '/vxeTableTest',
        name: "vxe-table测试",
      }


    ]
  }
]