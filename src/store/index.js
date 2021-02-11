import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    today: parseInt(moment().format('YYYYMMDD')),
    information: [],
    events: JSON.parse(localStorage.getItem('events') || '[]'),
    year: null,
    publicHoliday: []
  },
  mutations: {
    // Importera från fetch data till state objekt
    importHoliday(state, publicHoliday) {
      state.publicHoliday = publicHoliday;
    },

    setYear(state, year) {
      this.state.year = year;
    },

    setInfo(state, info) {
      state.events.push(info);
      localStorage.setItem('events', JSON.stringify(state.events));
    }
  },
  actions: {
    getHoliday({ commit }) {
      axios.get('/api/v2/publicholidays/2021/SE').then((response) => {
        // commit till motutions funktion med innehåll data.
        commit('importHoliday', response.data);
      });
    },

    saveInfo(context, info) {
      context.commit('setInfo', info);
    }
  },
  modules: {}
});
