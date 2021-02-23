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
    today: moment().format('YYYY[-]MM[-]DD'),
    // events: JSON.parse(localStorage.getItem('events') || '[]')
    events: [],
    userName: localStorage.getItem('userName') || null,
    serverAddress: "http://azureadsimeonkauffmann-fcccfdf1.localhost.run/events/"
  },


  mutations: {
    importHoliday(state, publicHoliday) {
      state.publicHoliday = publicHoliday;
    },

    setUserName(state, userName) {
      state.userName = userName
      localStorage.setItem('userName', userName)
      Vue.axios.get(
        `${state.serverAddress}newuser/${userName}`
      );
    },

    setEvents(state, data) {
      state.events = data
    },

    setYear(state, year) {
      state.year = year;
    },


    setSelectedDay(state, ctx) {
      state.selectedDay = ctx;
    },

    setQuote(state, quoteList) {
      const number = Math.floor(Math.random() * (quoteList.length - 0));
      const quote = quoteList[number].text;

      state.quote = quote;
    },

    async setInfo(state, info) {
      // state.events = state.events.filter(function (e) {
      //   return e.id != info.id;
      // });

      Vue.axios.post(`${state.serverAddress}${state.userName}`, info)
      await Vue.axios
        .get(`${state.serverAddress}${state.userName}`)
        .then((events) => {
          this.commit("setEvents", events.data)
        })

      // localStorage.setItem('events', JSON.stringify(state.events));
    },
    deleteEvent(state, id) {

      Vue.axios.delete(`${this.state.serverAddress}${this.state.userName}/${id}`)
        .then(Vue.axios
          .get(`${this.$store.state.serverAddress}${this.state.userName}`)
          .then((events) => {
            this.commit("setEvents", events.data)
          }))

      // state.events = state.events.filter(function (e) {
      //   return e.id != id;
      // });
      // localStorage.setItem('events', JSON.stringify(state.events));
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
    }
  },
  modules: {}
});
