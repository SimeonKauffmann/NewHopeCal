import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    publicHoliday: [],
    yearCheck: moment().format("YYYY"),
    today: parseInt(moment().format("YYYYMMDD")),
    information: [],
    quote: "",
    events: JSON.parse(localStorage.getItem('events') || '[]'),
    year: null,
  },
  mutations: {
    // Importera från fetch data till state objekt
    importHoliday(state, publicHoliday) {
      state.publicHoliday = publicHoliday;
    },

    setYear(state, year) {
      this.state.year = year;
    },

    setQuote(state, quote) {
      state.quote = quote;
    },

    setInfo(state, info) {
      state.events.push(info);
      localStorage.setItem('events', JSON.stringify(state.events));
    }
  },
  actions: {
    getHoliday({ commit }) {
      axios.get('/api/v2/publicholidays/' + this.state.yearCheck + '/SE')
      .then(response => {
        // commit till motutions funktion med innehåll data.
        commit('importHoliday', response.data);
      });
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
      context.commit('setInfo', info);
    }
  },
  modules: {}
});
