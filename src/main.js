'use strict'

import Vue from 'vue'
import firebase from 'firebase'

import App from './App.vue'
import AppHeader from './components/AppHeader.vue'
import AppImage from './components/AppImage.vue'

Vue.component('app-header', AppHeader)
Vue.component('app-image', AppImage)

firebase.initializeApp({
  apiKey: 'AIzaSyC-Snn54noZIBxGr5Vre-k5TfmHweXAXvs',
  authDomain: 'hotdog-7e6aa.firebaseapp.com',
  databaseURL: 'https://hotdog-7e6aa.firebaseio.com',
  projectId: 'hotdog-7e6aa',
  storageBucket: 'hotdog-7e6aa.appspot.com'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})