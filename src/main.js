import Vue from 'vue'
import VueStash from 'vue-stash'
import Vue2Filters from 'vue2-filters'
import App from './App'

Vue.use(VueStash)
Vue.use(Vue2Filters)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    store: {
      xmlData: [],
      contacts: [],
      messages: []
    }
  },
  render: h => h(App)
})
