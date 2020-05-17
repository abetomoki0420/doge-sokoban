import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueAxios, axios);

const router = new VueRouter();

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
