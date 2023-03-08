/**
 * @description 系统默认
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import fliter from './utils/filter'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

Vue.use(VXETable)
/**
 * @description 第三方插件
 */
import ElementUI from 'element-ui';
import moment from 'moment'
import camelCase from 'lodash/camelCase'
// 国际化处理
import { i18n } from '@/lang/index'

/**
 * @description 引入全局样式
 */
import 'element-ui/lib/theme-chalk/index.css';
// fa图标库
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import 'font-awesome/css/font-awesome.css'
import "./plugins/font-awesome-4.7.0/css/font-awesome.css"
// 全局公共样式放在在最底层
import './common/css/global.scss'

/**
 * @description 引入插件
 */
// import './utils/dragDialog'
import './plugins/el-bigdata-table'
import './icons' // icon

// 全局注册过滤器
Object.keys(fliter).forEach(key => {
  Vue.filter(key, fliter[key])
})
// 挂在时间格式化插件
Vue.prototype.$moment = moment
// 全局注册Vue组件
const requireComponent = require.context(
  // 其组件目录的相对路径
  './components/',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /\.vue$/
)
requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = camelCase(
    // 剥去文件名开头的 `./` 和结尾的扩展名
    fileName.substring(fileName.lastIndexOf('/') + 1, fileName.lastIndexOf('.'))
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
// 阻止鼠标右键
document.oncontextmenu = function () {
  return false
}
Vue.component('icon', Icon)

Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
