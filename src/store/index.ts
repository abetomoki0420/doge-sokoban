import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import { authModule } from "./auth";
import { mapModule } from "@/store/map";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    auth: {
      ...authModule
    },
    map: {
      ...mapModule
    }
  },
  plugins: [vuexLocal.plugin]
});
