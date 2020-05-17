import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueAxios, axios);

import Game from "@/components/Game.vue";
import Editor from "@/components/Editor.vue";
import List from "@/components/List.vue";

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: Game
    },
    {
      path: "/editor",
      component: Editor
    },
    {
      path: "/list",
      component: List
    }
  ]
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
