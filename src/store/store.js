import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    tempOrders: [],
    loading: false,
    email: null,
    localId: null,
    idToken: null
  },
  getters: {
    getTempOrders: state => {
      return state.tempOrders;
    },
    getLoaders: state => {
      return state.loading;
    },
    getAuthData: state => {
      const authData = {
        email: state.email,
        localId: state.localId,
        idToken: state.idToken
      };
      return authData;
    }
  },
  mutations: {
    purchaseData: (state, payload) => {
      console.log(payload);
      state.tempOrders.length = 0;
      state.tempOrders.push(payload);
      console.log(state.tempOrders);
    },
    setLoader: (state, payload) => {
      state.loading = payload;
    },
    setAuthData: (state, payload) => {
      state.email = payload.email;
      state.localId = payload.localId;
      state.idToken = payload.idToken;
    }
  },
  actions: {}
});
