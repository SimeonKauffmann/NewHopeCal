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
    events: [],
    userName: localStorage.getItem('userName') || null,
    serverAddress: 'https://061844f18b6a.ngrok.io/events/',
    offlineEvents: JSON.parse(localStorage.getItem('offlineEvents') || '[]'),
    isOnline: true
  },

  mutations: {
    importHoliday(state, publicHoliday) {
      state.publicHoliday = publicHoliday
    },

    setOnline(state) {
      state.isOnline = true
      this.commit('getEvents')
    },

    setOffline(state) {
      state.isOnline = false
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

    setQuote(state, quote) {
      // const number = Math.floor(Math.random() * (quoteList.length - 0))
      // const quote = quoteList[number].text

      state.quote = quote
    },

    getEvents(state) {
      if (state.isOnline) {
        if (state.offlineEvents[0]) {
          for (let x = 0; x < state.offlineEvents.length; x++) {
            Vue.axios
              .post(`${state.serverAddress}${state.userName}`, state.offlineEvents[x])
          }
          state.offlineEvents = []
          localStorage.setItem('offlineEvents', JSON.stringify(state.offlineEvents))
        }
        Vue.axios.get(`${state.serverAddress}${state.userName}`).then(events => {
          this.commit('setEvents', events.data)
        })
      }
    },

    updateInfo(state, info) {
      Vue.axios
        .put(`${state.serverAddress}${state.userName}/${info.id}`, info)
        .then(() => this.commit('getEvents'))
    },

    setInfo(state, info) {
      //Sofia

      if (state.isOnline) {
        state.events = state.events.filter(function (e) {
          return e.id != info.id;
        });

        Vue.axios
          .post(`${state.serverAddress}${state.userName}`, info)
          .then(() => this.commit('getEvents'))

        if (info.share) {
          let names = info.share.split(' ')
          for (let x = 0; x < names.length; x++) {
            Vue.axios.post(`${state.serverAddress}${names[x]}`, info)
          }
        }
      } else {
        state.offlineEvents.push(info)
        state.events.push(info)
        localStorage.setItem('offlineEvents', JSON.stringify(state.offlineEvents))
      }

      // localStorage.setItem('events', JSON.stringify(state.events));
    },



    deleteEvent(state, id) {
      if (!state.isOnline) {
        // Sofia
        state.offlineEvents = state.offlineEvents.filter(function (e) {
          return e.id != id;
        });
        localStorage.setItem('offlineEvents', JSON.stringify(state.offlineEvents));
      } else {
        Vue.axios
          .delete(`${state.serverAddress}${state.userName}/${id}`)
          .then(() => this.commit('getEvents'))
      }

    }
  },

  actions: {
    async fetchAll({ commit }) {
      // Detta är tidigare testning för med eller utan Promise och med tries som för backup.
      //Just nu låt detta vara tills vi eller mest jag som tar detta arbete tills hitta lösning -Patrik
      // Early version fetch when promise all to get data before show website.
      // const [holidays, quotes] = await Promise.all([
      //   axios.get(
      //     '/calanderAPI/v2/publicholidays/' + moment().format('YYYY') + '/SE'
      //   ),
      //   axios.get('/quoteAPI')
      // ])
      // Late version to tries if one fetch get error and replace with backup JSON file.
      // Fix the issue of get from json backup - Patrik

      let holidays = []
      try {
        holidays = await axios.get(
          '/calanderAPI/v2/publicholidays/' + moment().format('YYYY') + '/SE'
        )
      } catch (err) {
        holidays = await axios.get("/holidaysBackup2021.json")
      }

      // let holidays = await axios.get('/calanderAPI/v2/publicholidays/' + moment().format('YYYY') + '/SE')

      // Kommentera bort på grund av deras 522 Error, fortfarande error -Patrik
      // let quotes = await axios.get('/quoteAPI')
      let quotes = []

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
