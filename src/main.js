import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";

import VueFire from "vuefire";
import "firebase";

Vue.use(VueFire);

import Buefy from "buefy";
import "@/scss/main.scss";

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
