import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";
import { store } from "@/store";
import { router } from "@/router";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
