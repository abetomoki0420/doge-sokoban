import { GetterTree, MutationTree, ActionTree, Module } from "vuex";
import firebase, { User } from "firebase";
import firebaseApp from "@/firebase/firebase";

interface RootState {
  user: User | null;
}

const provider = new firebase.auth.GoogleAuthProvider();

export const authModule: Module<any, any> = {
  namespaced: true,
  state: (): RootState => ({
    user: null
  }),

  getters: {
    isSignedIn(state) {
      return !!state.user;
    }
  } as GetterTree<RootState, any>,

  mutations: {
    setUser(state, user: User) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    }
  } as MutationTree<RootState>,

  actions: {
    async signIn({ commit }) {
      try {
        const { user } = await firebaseApp.auth().signInWithPopup(provider);
        console.log("sign in succeeded");
        commit("setUser", user);
      } catch (e) {
        console.log("sign in failed", e);
      }
    },
    async signOut({ commit }) {
      await firebaseApp.auth().signOut();
      commit("clearUser");
    }
  } as ActionTree<RootState, any>
};
