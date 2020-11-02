import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import {firestorePlugin} from 'vuefire';
import firebase from 'firebase';
Vue.use(firestorePlugin);

Vue.config.productionTip = false

let app;
// eslint-disable-next-line no-unused-vars
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    app = new Vue({
      el: '#app',
      vuetify,
      router,
      render: h => h(App),
    }).$mount('#app')
  }
})



