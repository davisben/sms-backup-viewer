import Vue from 'vue'
import VueStash from 'vue-stash'
import Vue2Filters from 'vue2-filters'
import App from './App'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.use(VueStash)
Vue.use(Vue2Filters)

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>',
  data: {
    store: {
      data: [],
      contacts: [],
      messages: []
    }
  }
}).$mount('#app')
