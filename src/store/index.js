import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"




Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    publicHoliday: []

  },
  mutations: {
    // Importera från fetch data till state objekt
    importHoliday(state, publicHoliday) {
      state.publicHoliday = publicHoliday
    }

  },
  actions: {
    getHoliday({ commit }) {
      axios.get('/api/v2/publicholidays/2021/SE')
      .then(response => {
        // commit till motutions funktion med innehåll data.
        commit("importHoliday", response.data)
      })
    }
  },
  modules: {


  }
})
