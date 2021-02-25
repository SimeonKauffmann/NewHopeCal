import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import axios from 'axios'

Vue.use(Vuex)

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
    serverAddress:
      'http://bd2b6be57a20.ngrok.io/events/'
  },

  mutations: {
    importHoliday(state, publicHoliday) {
      state.publicHoliday = publicHoliday
    },

    setUserName(state, userName) {
      state.userName = userName
      localStorage.setItem('userName', userName)
      Vue.axios.get(`${state.serverAddress}newuser/${userName}`)
    },

    setEvents(state, data) {
      state.events = data
    },

    setYear(state, year) {
      state.year = year
    },

    setSelectedDay(state, ctx) {
      state.selectedDay = ctx
    },

    setQuote(state, quoteList) {
      const number = Math.floor(Math.random() * (quoteList.length - 0))
      const quote = quoteList[number].text

      state.quote = quote
    },

    getEvents(state) {
      Vue.axios.get(`${state.serverAddress}${state.userName}`).then(events => {
        this.commit('setEvents', events.data)
      })
    },

    updateInfo(state, info) {
      Vue.axios
        .put(`${state.serverAddress}${state.userName}/${info.id}`, info)
        .then(() => this.commit('getEvents'))

      if (info.share) {
        let names = info.share.split(' ')
        for (let x = 0; x < names.length; x++) {
          Vue.axios.post(`${state.serverAddress}${names[x]}`, info)
        }
      }
    },

    setInfo(state, info) {
      // state.events = state.events.filter(function (e) {
      //   return e.id != info.id;
      // });

      Vue.axios
        .post(`${state.serverAddress}${state.userName}`, info)
        .then(() => this.commit('getEvents'))

      if (info.share) {
        let names = info.share.split(' ')
        for (let x = 0; x < names.length; x++) {
          Vue.axios.post(`${state.serverAddress}${names[x]}`, info)
        }
      }

      // localStorage.setItem('events', JSON.stringify(state.events));
    },
    deleteEvent(state, id) {
      Vue.axios
        .delete(`${state.serverAddress}${state.userName}/${id}`)
        .then(() => this.commit('getEvents'))

      // state.events = state.events.filter(function (e) {
      //   return e.id != id;
      // });
      // localStorage.setItem('events', JSON.stringify(state.events));
    }
  },

  actions: {
    async fetchAll({ commit }) {
      let holidays

      try {
        holidays = await axios.get(
          '/calanderAPI/v2/publicholidays/' + moment().format('YYYY') + '/SE'
        )
      } catch (error) {
        holidays = await axios.get("/holidaysBackup2021")
      }

      let quotes = await axios.get('https://type.fit/api/quotes')

      commit('importHoliday', holidays.data)
      commit('setQuote', quotes.data)
    },

    saveInfo(context, info) {
      context.commit('setInfo', info)
    },

    saveUpdateInfo(context, info) {
      context.commit('updateInfo', info)
    },

    deleteEvent(context, id) {
      context.commit('deleteEvent', id)
    }
  },
  modules: {}
})
