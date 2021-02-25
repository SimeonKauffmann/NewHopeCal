<template>
  <div class="day">
    <h1 id="date">{{ $store.state.selectedDay.selectedFormatted }}</h1>
    <h2 id="name">{{ redDay }}</h2>
    <div class="mobile">
      <div id="gridHolder">
        <b-card-group deck class="container">
          <b-card v-for="event in getTodaysEvents()" :key="event.id">
            <div id="note" :style="eventTypeClass(event)">
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
    </div>
    <div class="desktop">
      <div id="gridHolder">
        <div deck class="container">
          <div
            class="times-h"
            :key="line.id"
            v-for="line in lines"
            :style="line.styles"
          ></div>
          <div
            v-for="event in getTodaysEvents()"
            :key="event.id"
            :style="event.styles"
            class="cardDay"
          >
            <div id="note" :style="eventTypeClass(event)">
              <h3 id="title">{{ event.title }}</h3>
              <p>
                {{ event.text }}
              </p>
              <ul>
                <li>
                  Start:
                  <span class="numbers-small">{{ event.startTime }}</span>
                </li>
                <li class="li-last">
                  End: <span class="numbers-small">{{ event.endTime }}</span>
                </li>
              </ul>
              <div>
                <b-button
                  id="edit"
                  href="#"
                  size="sm"
                  variant="secondary"
                  @click="editEvent(event)"
                  >Edit</b-button
                >
                <span
                  id="remove"
                  variant="white"
                  size="sm"
                  class="h1 mb-2"
                  @click="removeAction(event.id)"
                  >Remove</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
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
      lines: []
    }
  },
  methods: {
    createLines() {
      for (let y = 0; y < 24; y++) {
        this.lines.push({
          count: y,
          styles: {
            gridRowStart: y + 1,
            gridColumnStart: 1,
            gridColumnEnd: 5,
            gridRowEnd: y + 1,
            height: '100%',
            width: '100%'
          },
          id: Math.random()
        })
      }
    },
    eventTypeClass(event) {
      if (event.type === 'Work') {
        console.log('work')
        return 'background-color: rgba(96, 139, 150, 1)'
      } else if (event.type === 'Sport') {
        console.log('Sport')
        return 'background-color: rgba(132, 146, 131, 1)'
      } else if (event.type === 'Fun') {
        console.log('Fun')
        return 'background-color: rgb(246, 189, 96)'
      }
      console.log('none')
      return 'background-color: rgba(229, 152, 118, 1);'
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
      this.modalShow = true
    },
    onClose() {
      this.modalShow = false
    },
    removeAction(event) {
      this.$store.commit('deleteEvent', event)
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
          gridRowStart: startNumber + 1,
          gridRowEnd: endNumber + 1,
          height: `100%`,
          width: '100%',
          backgroundColor: 'transparent',
          marginLeft: '50px',
          zIndex: '2'
        }
      }

      todayEvents.sort(function (a, b) {
        return a.startNumber - b.startNumber
      })
      return todayEvents
    }
  },
  mounted() {
    this.createLines()
    if (!this.$store.state.selectedDay) {
      this.$router.push('/')
    }
    this.$store.dispatch('fetchAll')
    this.$store.state.publicHoliday.forEach((element) => {
      if (element.date === this.$route.params.day) {
        this.redDay = element.name
      }
    })
  },

  components: { Event }
}
</script>

<style lang="scss" scoped>
.mobile {
  display: block;
}
.desktop {
  display: none;
}

ul {
  list-style: none;
  padding: 0;
  margin: 15px 0;
  li {
    position: relative;
    margin-bottom: 4px;
  }

  .container {
    margin-top: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 15px 0;
    li {
      position: relative;
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
  overflow: scroll;
  background-color: white;
  margin: 40px auto;
}

#newEventInput {
  margin-bottom: 1rem;
}
#editHolder {
  float: right;
  margin: auto;
  margin-right: 1em;
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

@media screen and (min-width: 900px) {
  .mobile {
    display: none;
  }
  .desktop {
    display: block;
  }
  ul {
    margin: 5px 0;
  }
  li {
    margin-bottom: 4px;
    display: inline-block;
  }
  .li-last {
    margin-left: 40px;
  }
  p {
    display: inline-block;
    margin: 0;
  }
  #title {
    margin: 0;
  }
  .container {
    position: relative;
    margin-top: 10px;
    display: grid;
    row-gap: 5px;
    grid-template-columns: repeat(4, auto);
    grid-template-rows: repeat(24, 100px);
    grid-template-areas:
      '00 00 00 00'
      '1 1 1 1'
      '2 2 2 2'
      '3 3 3 3'
      '4 4 4 4'
      '5 5 5 5'
      '6 6 6 6'
      '7 7 7 7'
      '8 8 8 8'
      '9 9 9 9'
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
  .times-h {
    position: absolute;
    border-bottom: 3px solid rgba(0, 0, 0, 0.5);
    pointer-events: none;
    z-index: 1;
  }
  .day {
    counter-reset: section -1;
  }
  .times-h::before {
    counter-increment: section;
    content: counter(section) '.00';
  }
  #note {
    height: 100%;
    margin: 0 5px;
    padding: 2px 1.5rem;

    display: flex;
    flex-direction: column;
  }
  #gridHolder {
    max-height: 70vh;
    min-height: none;
  }
}
</style>
