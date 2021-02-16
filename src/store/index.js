import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    quote: '',
    year: null,
    publicHoliday: [],
    selectedDay: null,

    today: parseInt(moment().format('YYYYMMDD')),
    events: JSON.parse(localStorage.getItem('events') || '[]')
  },

  mutations: {
    importHoliday(state, publicHoliday) {
      state.publicHoliday = publicHoliday;
    },

    setYear(state, year) {
      this.state.year = year;
    },

    setQuote(state, quoteList) {
      const number = Math.floor(Math.random() * (quoteList.length - 0));
      const quote = quoteList[number].text;

      state.quote = quote;
    },

    setInfo(state, info) {
      state.events.push(info);
      localStorage.setItem('events', JSON.stringify(state.events));
    },
    deleteEvent(state, id) {
      state.events = state.events.filter(function(e) {
        return e.id != id;
      });
      localStorage.setItem('events', JSON.stringify(state.events));
    }
  },

  actions: {
    async fetchAll({ commit }) {
      const [holidays, quotes] = await Promise.all([
        axios.get(
          '/calanderAPI/v2/publicholidays/' + moment().format('YYYY') + '/SE'
        ),
        axios.get('https://type.fit/api/quotes')
      ]);

      commit('importHoliday', holidays.data);
      commit('setQuote', quotes.data);
    },

    saveInfo(context, info) {
      context.commit('setInfo', info);
    },

    deleteEvent(context, id) {
      context.commit('deleteEvent', id);
      console.log(id);
    }
  },
  modules: {}
});
