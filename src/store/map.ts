import { GetterTree, MutationTree, ActionTree, Module } from "vuex";
import firebaseApp from "@/firebase/firebase";

interface RootState {
  maps: any;
  selectedMap: any;
}

export const mapModule: Module<any, any> = {
  namespaced: true,
  state: (): RootState => ({
    maps: [],
    selectedMap: null
  }),

  getters: {
    getMaps(state) {
      return state.maps;
    },
    getSelectedMap(state) {
      return state.selectedMap;
    }
  } as GetterTree<RootState, any>,

  mutations: {
    setMap(state, map) {
      state.maps.push(map);
    },
    setSelectedMap(state, selectedMap) {
      state.selectedMap = selectedMap;
    },
    clearMap(state) {
      state.maps = [];
    }
  } as MutationTree<RootState>,

  actions: {
    async fetchMapsByUid({ commit }, uid: string) {
      const ref = firebaseApp
        .firestore()
        .collection("maps")
        .where("uid", "==", uid);

      commit("clearMap");

      await ref.get().then(snapshot => {
        snapshot.forEach(doc => {
          commit("setMap", {
            id: doc.id,
            ...doc.data()
          });
        });
      });
    },
    async fetchMapByMapId({ commit }, id: string) {
      const ref = firebaseApp
        .firestore()
        .collection("maps")
        .doc(id);

      await ref.get().then(snapshot => {
        commit("setSelectedMap", snapshot.data());
      });
    },
    async createMap({ commit }, payload: any) {
      await firebaseApp
        .firestore()
        .collection("maps")
        .add(payload);
    }
  } as ActionTree<RootState, any>
};
