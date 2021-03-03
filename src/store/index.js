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

    setQuote(state, quoteList) {
      // Get content quote
      const content = quoteList.content
      // Get Author of quotes
      const author = quoteList.author

      // Assemble together
      const quote = content + ' -' + author
      state.quote = quote
    },

    async sendOfflineEvents(state) {
      for (let x = 0; x < state.offlineEvents.length; x++) {
        Vue.axios.post(
          `${state.serverAddress}${state.userName}`,
          state.offlineEvents[x]
        )
      }
      state.offlineEvents = []
      localStorage.setItem('offlineEvents', JSON.stringify(state.offlineEvents))
    },

    getEvents(state) {
      if (state.isOnline) {
        if (state.offlineEvents[0]) {
          this.commit('sendOfflineEvents').then(() => {
            Vue.axios
              .get(`${state.serverAddress}${state.userName}`)
              .then(events => {
                this.commit('setEvents', events.data)
              })
          })
        } else {
          Vue.axios
            .get(`${state.serverAddress}${state.userName}`)
            .then(events => {
              this.commit('setEvents', events.data)
            })
        }
      }
    },

    updateInfo(state, info) {
      Vue.axios
        .put(`${state.serverAddress}${state.userName}/${info.id}`, info)
        .then(() => this.commit('getEvents'))
    },

    setInfo(state, info) {
      //Sofia
      state.events = state.events.filter(function(e) {
        return e.id != info.id
      })

      if (state.isOnline) {
        state.events = state.events.filter(function(e) {
          return e.id != info.id
        })

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
        localStorage.setItem(
          'offlineEvents',
          JSON.stringify(state.offlineEvents)
        )
      }

      // localStorage.setItem('events', JSON.stringify(state.events));
    },

    deleteEvent(state, id) {
      if (!state.isOnline) {
        // Sofia
        state.offlineEvents = state.offlineEvents.filter(function(e) {
          return e.id != id
        })
        localStorage.setItem(
          'offlineEvents',
          JSON.stringify(state.offlineEvents)
        )
      } else {
        Vue.axios
          .delete(`${state.serverAddress}${state.userName}/${id}`)
          .then(() => this.commit('getEvents'))
      }
    }
  },

  actions: {
    async fetchAll({ commit }) {

      // Early version fetch when promise all to get data before show website. -Patrik
      // const [holidays, quotes] = await Promise.all([
      //   axios.get(
      //     '/calanderAPI/v2/publicholidays/' + moment().format('YYYY') + '/SE'
      //   ),
      //   axios.get('/quoteAPI')
      // ])


      // Late version to tries if one fetch get error and replace with backup JSON file. -Patrik
      let holidays = []
      let quotes = []
      
      // Try to fetch holidays, otherwise replace backup JSON
      try {
        holidays = await axios.get(
          '/calanderAPI/v2/publicholidays/' + moment().format('YYYY') + '/SE'
        )
      } catch (err) {
        holidays = await axios.get('/holidaysBackup2021.json')
      }

      // Try to fetch quote, otherwise replace backup JSON
      try {
        quotes = await axios.get('http://api.quotable.io/random')
      } catch (err) {
        quotes = await axios.get('/quotesBackup.json')
      }

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
