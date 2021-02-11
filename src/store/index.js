import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import moment from "moment";



Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    publicHoliday: [],
    today: parseInt(moment().format("YYYYMMDD")),
    information: [],
    events: JSON.parse(localStorage.getItem("events") || "[]"),
    quote: "",
  },
  mutations: {
    // Importera från fetch data till state objekt
    importHoliday(state, publicHoliday) {
      state.publicHoliday = publicHoliday
    },

    setInfo(state, info) {
      state.information.push(info);
      state.events.push(info);
      localStorage.setItem("events", JSON.stringify(state.events));
    },

    setQuote(state, quote) {
      state.quote = quote;
    }

  },
  actions: {
    getHoliday({ commit }) {
      axios.get('/api/v2/publicholidays/2021/SE')
      .then(response => {
        // commit till motutions funktion med innehåll data.
        commit("importHoliday", response.data)
      })
    },
    fetchQuote({ commit }) {
      axios.get('https://type.fit/api/quotes')
      .then(({ data })=> {
        const number = Math.floor(Math.random() * (data.length - 0));
        const quote = data[number].text;
        commit("setQuote", quote)
      })
    },

    saveInfo(context, info) {
      context.commit("setInfo", info);
    },
  },
})
