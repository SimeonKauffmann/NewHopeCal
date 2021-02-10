import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'


Vue.use(Vuex)



export default new Vuex.Store({


  state: {
    today: parseInt(moment().format('YYYYMMDD')),
    events: [
      {
        eventName: 'something',
        date: 20210210,
        startTime: '9:00',
        endTime: '11:00',
        eventColor: 'red'
      },
      {
        eventName: 'something else',
        date: 20210210,
        startTime: '13:00',
        endTime: '14:00',
        eventColor: 'blue'
      },
      {
        eventName: 'something',
        date: 20210213,
        startTime: '9:00',
        endTime: '11:00',
        eventColor: 'red'
      },
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
