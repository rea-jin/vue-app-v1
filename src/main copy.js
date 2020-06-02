import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'

Vue.config.productionTip = false

 // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLHciESnb5_0GM0Q_j6yxVLxZq5QaVIA8",
  authDomain: "application-11efe.firebaseapp.com",
  databaseURL: "https://application-11efe.firebaseio.com",
  projectId: "application-11efe",
  storageBucket: "application-11efe.appspot.com",
  messagingSenderId: "766366439836",
  appId: "1:766366439836:web:e66cc0e8959358af241059",
  measurementId: "G-F7SB2FZSW4"
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
