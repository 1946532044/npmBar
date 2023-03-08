export default {
  install (vue) {
    let contextAll = require.context('./components', true, /.vue$/)
    // const requireComponent = require.context(
    //   // 其组件目录的相对路径
    //   './components/',
    //   // 是否查询其子目录
    //   true,
    //   // 匹配基础组件文件名的正则表达式
    //   /\.vue$/
    // )
    console.log(contextAll);
    contextAll.keys().forEach(item => {
      vue.component(contextAll(item).default.name, contextAll(item).default)
    });
  }
}