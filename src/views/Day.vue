<template>
  <div class="day">
    <h1 id="date">{{ $store.state.selectedDay.selectedFormatted }}</h1>
    <h2 id="name">{{ redDay }}</h2>
    <div id="gridHolder">
      <div deck class="container">
        <div
          v-for="event in getTodaysEvents()"
          :key="event.id"
          :style="event.styles"
          class="cardDay"
        >
          <div id="note">
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
          id: null
        }
        this.modalShow = true
      },
      onClose() {
        this.modalShow = false
      },
      getTodaysEvents() {
        let todayEvents = []
        this.$store.state.events.forEach(element => {
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
            backgroundColor: 'transparent'
            // marginTop: `${startNumber * 2}rem`
          }
        }

        todayEvents.sort(function(a, b) {
          return a.startNumber - b.startNumber
        })
        return todayEvents
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
      this.$store.state.publicHoliday.forEach(element => {
        if (element.date === this.$route.params.day) {
          this.redDay = element.name
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
    height: 100%;
    margin: 0 5px;
    background-color: rgba(229, 152, 118, 1);
    padding: 2px 1.5rem;
    border-radius: 2%;
    display: flex;
    flex-direction: column;
  }

  #plus {
    margin-left: 22rem;
    cursor: pointer;
  }
  #gridHolder {
    border: solid;
    width: 80%;
    max-height: 70vh;
    overflow: scroll;
    background-color: white;
    margin: 40px auto;
  }
  #title {
    margin: 0;
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
</style>
