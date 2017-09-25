'use strict'

import Vue from 'vue'
import App from './App.vue'
import AppHeader from './components/AppHeader.vue'
import AppImage from './components/AppImage.vue'

Vue.component('app-header', AppHeader)
Vue.component('app-image', AppImage)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})