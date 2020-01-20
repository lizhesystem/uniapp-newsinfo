import Vue from 'vue'
import App from './App'
import {Myrequet} from 'utils/request.js'
import {dataformat} from 'utils/time_utils.js'

Vue.config.productionTip = false
// 把Api接口挂在到Vue的prototype上
Vue.prototype.$api = Myrequet

// 时间的过滤器
Vue.filter('timeFormat', dataformat)

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
