import Vue from "vue";
import Vuex from "vuex";
import moment from "moment";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    today: parseInt(moment().format("YYYYMMDD")),
    information: [],
    events: JSON.parse(localStorage.getItem("events") || "[]"),
  },
  mutations: {
    setInfo(state, info) {
      state.information.push(info);
      state.events.push(info);
      localStorage.setItem("events", JSON.stringify(state.events));
    },
  },
  actions: {
    saveInfo(context, info) {
      context.commit("setInfo", info);
    },
  },
  modules: {},
});
