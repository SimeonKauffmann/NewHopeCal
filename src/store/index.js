import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { information: [] },
  mutations: {
    setInfo(state, info) {
      state.information.push(info);
    },
  },
  actions: {
    saveInfo(context, info) {
      context.commit("setInfo", info);
    },
  },
  modules: {},
});
