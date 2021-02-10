import Vue from "vue";
import Vuex from "vuex";
import moment from "moment";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    today: parseInt(moment().format("YYYYMMDD")),
    information: [],
  },
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
