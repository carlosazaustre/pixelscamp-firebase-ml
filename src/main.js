'use strict'

import Vue from 'vue'
import firebase from 'firebase'

import App from './App.vue'
import AppHeader from './components/AppHeader.vue'
import AppImage from './components/AppImage.vue'

Vue.component('app-header', AppHeader)
Vue.component('app-image', AppImage)

firebase.initializeApp({
  apiKey: 'AIzaSyDFcBEHHQPo3FMwKmvVEgxOBM3T6M8Oc4s',
  authDomain: 'hotdog-e27b2.firebaseapp.com',
  databaseURL: 'https://hotdog-e27b2.firebaseio.com',
  projectId: 'hotdog-e27b2',
  storageBucket: 'hotdog-e27b2.appspot.com'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})