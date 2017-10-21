import Vue from 'vue'
import VueStash from 'vue-stash'
import Vue2Filters from 'vue2-filters'
import PhoneNumber from 'awesome-phonenumber'
import App from './App'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.use(VueStash)
Vue.use(Vue2Filters)

Vue.prototype.$imageMimeTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif'
]

Vue.prototype.$randomColor = function () {
  var colors = [
    'red',
    'pink',
    'purple',
    'indigo',
    'teal',
    'blue-grey'
  ]
  var key = Math.floor(Math.random() * colors.length)

  return colors[key]
}

Vue.prototype.$normalizeAddress = function (address) {
  var pn = PhoneNumber(address, 'US')
  var number = pn.getNumber('e164')

  if (number === undefined) {
    number = address
  }

  return number
}

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
