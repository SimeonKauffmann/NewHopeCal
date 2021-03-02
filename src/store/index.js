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
    serverAddress: 'http://061844f18b6a.ngrok.io/events/',
    offlineEvents: JSON.parse(localStorage.getItem('events') || '[]'),
    isOnline: true
  },

  mutations: {
    importHoliday(state, publicHoliday) {
      state.publicHoliday = publicHoliday
    },

    setOnline(state) {
      state.isOnline = true
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

    setQuote(state, quoteList) {
      // Get content quote
      const content = quoteList.content
      // Get Author of quotes
      const author = quoteList.author

      // Assemble together
      const quote = content + ' -' + author
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
    },

    setInfo(state, info) {
      //Sofia
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

      // localStorage.setItem('events', JSON.stringify(state.events));
    },

    sendOfflineEvents(state) {
      state.offlineEvents
        .forEach(event => {
          Vue.axios.post(`${state.serverAddress}${state.userName}`, event)
        })
        .then(() => this.commit('getEvents'))
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
      let quotes = []
      
      try {
        holidays = await axios.get(
          '/calanderAPI/v2/publicholidays/' + moment().format('YYYY') + '/SE'
        )    
      } catch (err) {
        holidays = await axios.get('/holidaysBackup2021.json')
      }

      try {
        quotes = await axios.get('http://api.quotable.io/random')
      } catch (err) {
                quotes = await axios.get('/quotesBackup.json')
      }

     


      // let holidays = await axios.get('/calanderAPI/v2/publicholidays/' + moment().format('YYYY') + '/SE')

      // Kommentera bort på grund av deras 522 Error, fortfarande error -Patrik
      // let quotes = await axios.get('/quoteAPI')

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
