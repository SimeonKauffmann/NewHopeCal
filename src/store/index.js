import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import moment from "moment";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    publicHoliday: [],
    today: parseInt(moment().format("YYYYMMDD")),
    events: JSON.parse(localStorage.getItem("events") || "[]"),
  },
  mutations: {
    // Importera från fetch data till state objekt
    importHoliday(state, publicHoliday) {
      state.publicHoliday = publicHoliday;
    },

    setInfo(state, info) {
      state.events.push(info);
      localStorage.setItem("events", JSON.stringify(state.events));
    },
  },
  actions: {
    getHoliday({ commit }) {
      axios.get("/api/v2/publicholidays/2021/SE").then((response) => {
        // commit till motutions funktion med innehåll data.
        commit("importHoliday", response.data);
      });
    },

    saveInfo(context, info) {
      context.commit("setInfo", info);
    },
  },
});
