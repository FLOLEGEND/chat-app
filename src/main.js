import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import firebase from "firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/css/main.css";
require("firebase/firestore");
Vue.config.productionTip = false;

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDw7z2GFopqyBvB93JV2Ow4xD7co0XaZw4",
  authDomain: "chatapp-409a2.firebaseapp.com",
  projectId: "chatapp-409a2",
  storageBucket: "chatapp-409a2.appspot.com",
  messagingSenderId: "38954377434",
  appId: "1:38954377434:web:d37815f4416a4356ae85e3",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export const dbMenuRef = db.collection("messages");
db.settings({
  timestampsInSnapshots: true,
});
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
