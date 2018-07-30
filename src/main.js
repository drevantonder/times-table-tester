import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";

import VueFire from "vuefire";
import "./firebase";

Vue.use(VueFire);

import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faGithub);

Vue.component("font-awesome-icon", FontAwesomeIcon);

import Buefy from "buefy";
import "@/scss/main.scss";

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
