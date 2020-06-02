import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'

Vue.config.productionTip = false

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCebu2BQP0u8cclCz6Me2DfYy1U4APaMno",
    authDomain: "list-cc4f3.firebaseapp.com",
    databaseURL: "https://list-cc4f3.firebaseio.com",
    projectId: "list-cc4f3",
    storageBucket: "list-cc4f3.appspot.com",
    messagingSenderId: "979066078653",
    appId: "1:979066078653:web:625544ddf33fc85df87ed4",
    measurementId: "G-N0YHE7KL4M"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


new Vue({
  // routeを渡す 省略しなければ、router:router, 
  router, // ES6
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
