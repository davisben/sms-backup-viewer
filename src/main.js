import Vue from 'vue'
import VueStash from 'vue-stash'
import App from './App'

Vue.use(VueStash)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    store: {
      contacts: '',
      messages: ''
    }
  },
  render: h => h(App)
})
