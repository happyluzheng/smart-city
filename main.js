// 样式
import './styles/all.less' 
// Three.js 3D 入口
import '@/entry'
// 菜单
import '@/dom/menu'
// 2D 图表入口
import '@/charts'


// 目标：把 Three.js 项目移植到 Vue 项目中
// 1. 安装需要的依赖包
// 2. 标签和样式部分，赋值到 .vue 文件，并在入口引入 less
// 3. JS 部分复制到对应页面的 .vue 文件中使用
// 4. 资源文件和 JS 逻辑代码文件直接复制到 Vue 项目中运行

// three.js 主要是面向对象和面向过程开发，很少有标签和数据双向绑定
