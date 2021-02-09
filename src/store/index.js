import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: { RedDates: null, map: new Map() },
  mutations: {
    setDates(state, RedDates) {
      state.RedDates = RedDates;
    },
  },
  actions: {
    getRedDays(context) {
      axios
        .get("https://date.nager.at/api/v2/publicholidays/2021/SE", {
          crossdomain: true,
        })
        .then((response) => {
          context.commit("setDates", response);
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
  modules: {},
});
