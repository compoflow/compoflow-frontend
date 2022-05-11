/*
 * @Author: Lavender
 * @Date: 2021-12-14 20:14:27
 * @LastEditors: Lavender
 * @LastEditTime: 2022-03-26 20:20:37
 * @Description: 导包，注册全局组件（elementUI在这注册）
 * @FilePath: /bpmn_workflow/src/main.js
 */

import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
// 以下为bpmn工作流绘图工具的样式
import 'bpmn-js/dist/assets/diagram-js.css' // 左边工具栏以及编辑节点的样式
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css' // 右边工具栏样式
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import './css/app.css'

Vue.use(ElementUI.Container)
Vue.use(ElementUI.Footer)
Vue.use(ElementUI.Button)
Vue.use(ElementUI.Upload)

new Vue({
  render: h => h(App),
}).$mount('#app')