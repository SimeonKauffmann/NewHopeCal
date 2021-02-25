<template>
  <div class="day">
    <h1 id="date">{{ $store.state.selectedDay.selectedFormatted }}</h1>
    <h2 id="name">{{ redDay }}</h2>
    <div id="gridHolder">
      <b-card-group deck class="container">
        <b-card
          v-for="(event, index) in getTodaysEvents()"
          :key="event.id"
          :style="gridAreaStart[index] + gridAreaEnd[index]"
        >
          <div id="note" :class="eventTypeClass(event)">
            <h3 id="title">{{ event.title }}</h3>
            <ul>
              <li>
                Start:
                <span class="numbers-small">{{ event.startTime }}</span>
              </li>
              <li>
                End: <span class="numbers-small">{{ event.endTime }}</span>
              </li>
            </ul>
            <div class="text-wrapper">
              <p>
                {{ event.text }}
              </p>
            </div>

            <b-button
              id="edit"
              href="#"
              size="lg"
              variant="secondary"
              @click="editEvent(event)"
              >Edit</b-button
            >
            <span
              id="remove"
              variant="white"
              class="h1 mb-2"
              @click="removeAction(event.id)"
              >Remove</span
            >
          </div>
        </b-card>
      </b-card-group>
    </div>
    <span id="editHolder">
      <b-icon-plus-circle
        id="plus"
        class="h1 mb-2"
        @click="createEvent"
      ></b-icon-plus-circle>
    </span>
    <Event
      :show="modalShow"
      @close="onClose"
      @ok="onOk"
      @cancel="onCancel"
      :event="currentEvent"
    />
  </div>
</template>

<script>
import Event from '@/components/Event.vue'

export default {
  name: 'Day',
  data() {
    return {
      modalShow: false,
      editShow: false,
      currentEvent: null,
      redDay: null,
      gridAreaStart: [],
      gridAreaEnd: []
    }
  },

  methods: {
    eventTypeClass(event) {
      if (event.type === 'Work') {
        return 'workColor'
      } else if (event.type === 'Sport') {
        return 'sportColor'
      } else if (event.type === 'Fun') {
        return 'funColor'
      }
      return 'noneColor'
    },

    editEvent(event) {
      this.currentEvent = event
      this.modalShow = true
    },
    onCancel() {
      this.modalShow = false
    },
    onOk() {
      this.modalShow = false
    },

    createEvent() {
      this.currentEvent = {
        date: this.$route.params.day,
        title: null,
        startTime: '09:00',
        endTime: '10:00',
        text: null,
        id: null,
        type: 'None'
      }
    },
    getTodaysEvents() {
      let todayEvents = []
      this.$store.state.events.forEach((element) => {
        if (element.date === this.$route.params.day) {
          todayEvents.push(element)
        }
      })

      for (let x = 0; x < todayEvents.length; x++) {
        let startNumber = parseInt(todayEvents[x].startTime.slice(0, 2))

        todayEvents[x].startNumber = startNumber

        let endNumber = parseInt(todayEvents[x].endTime.slice(0, 2))

        todayEvents[x].styles = {
          backgroundColor: todayEvents[x].color,
          height: `${(endNumber - startNumber) * 2}rem`,
          marginTop: `${startNumber * 2}rem`,
          position: 'absolute',
          width: '60%'
        }

        todayEvents.sort(function (a, b) {
          return a.startNumber - b.startNumber
        })

        return todayEvents
      }
    },
    removeAction(id) {
      this.$store.dispatch('deleteEvent', id)
    }
  },
  mounted() {
    if (!this.$store.state.selectedDay) {
      this.$router.push('/')
    }
    this.$store.dispatch('fetchAll')
    this.$store.state.publicHoliday.forEach((element) => {
      if (element.date === this.$route.params.day) {
        this.redDay = element.name
      }
    })
    this.$store.state.events.forEach((element) => {
      if (element.date === this.$route.params.day) {
        this.gridAreaStart.push(
          `grid-row-start:${element.startTime.slice(0, 2)};`
        )
        this.gridAreaEnd.push(`grid-row-end:${element.endTime.slice(0, 2)};`)
        this.gridAreaStart.reverse()
        this.gridAreaEnd.reverse()
      }
    })
  },
  components: { Event }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-template-rows: repeat(24, auto);
  grid-template-areas:
    '00 00 00 00'
    '01 01 01 01'
    '02 02 02 02'
    '03 03 03 03'
    '04 04 04 04'
    '05 05 05 05'
    '06 06 06 06'
    '07 07 07 07'
    '08 08 08 08'
    '09 09 09 09'
    '10 10 10 10'
    '11 11 11 11'
    '12 12 12 12'
    '13 13 13 13'
    '14 14 14 14'
    '15 15 15 15'
    '16 16 16 16'
    '17 17 17 17'
    '18 18 18 18'
    '19 19 19 19'
    '20 20 20 20'
    '21 21 21 21'
    '22 22 22 22'
    '23 23 23 23';
}
.text-wrapper {
  background: #fff;
  border: 2px solid black;
  margin-bottom: 20px;
  max-height: 150px;
  overflow: scroll;
  p {
    padding: 2px 8px;
  }
}
ul {
  list-style: none;
  padding: 0;
  margin: 15px 0;
  li {
    position: relative;
    margin-bottom: 4px;
  }
  li::before {
    content: url('../assets/clock.svg');
    top: 6px;
    left: -20px;
    position: absolute;
  }
}
#edit {
  float: right;
}
#remove {
  font-size: 1rem;
  color: aliceblue;
  cursor: pointer;
}

#note {
  background-color: rgba(229, 152, 118, 1);
  padding: 2rem;
  border-radius: 2%;
}

#plus {
  margin-left: 22rem;
  cursor: pointer;
}
#gridHolder {
  border: solid;
  width: 80%;
  min-height: 70vh;
  background-color: white;
  margin: 40px auto;
}

#newEventInput {
  margin-bottom: 1rem;
}
#editHolder {
  float: right;
  margin: auto;
  margin-right: 1rem;
}
#date {
  margin: 15px 15px;
  width: 80%;
}
#name {
  margin: 15px 15px;
}
.noneColor {
  background-color: rgba(229, 152, 118, 1);
}
.workColor {
  background-color: rgba(96, 139, 150, 1);
}
.sportColor {
  background-color: rgba(132, 146, 131, 1);
}
.funColor {
  background-color: rgb(246, 189, 96);
}
</style>
