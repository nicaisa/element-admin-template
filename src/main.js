import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import './filters'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import _ from 'lodash'

import ls from  './utils/localStorage'
import { resData } from "@/utils/base"
import { EventUtil } from  "@/utils/EventUtil"

Vue.use(ElementUI)

Vue.prototype.echarts = echarts;
Vue.prototype._ = _
Vue.prototype.ls = ls;
Vue.prototype.resData = resData;
Vue.prototype.EventUtil = EventUtil

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  data: {
    // 空的实例放到根组件下，所有的子组件都能调用
    Bus: new Vue()
  }
}).$mount('#app')
