import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    tempOrders: []
  },
  getters: {
    getTempOrders: state => {
      return state.tempOrders;
    }
  },
  mutations: {
    purchaseData: (state, payload) => {
      console.log(payload);
      state.tempOrders.length = 0;
      state.tempOrders.push(payload);
      console.log(state.tempOrders);
    }
  },
  actions: {}
});
