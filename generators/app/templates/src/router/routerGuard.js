// 自动化加载路由页面
const files = require.context('./routerGuaterArr/', true, /\.js$/);
const modules = {};
files.keys().forEach(key => {
  if (key === './index.js') return;
  const content = files(key).default;
  modules[key.replace(/(\.\/|\.js)/g, '')] = content;
});
export default Object.values(modules).flat()