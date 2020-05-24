import Vue from "vue";
import Vuex from "vuex";
import { authModule } from "./auth";
import VuexPersistence from "vuex-persist";
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    auth: {
      ...authModule
    }
  },
  plugins: [vuexLocal.plugin]
});
