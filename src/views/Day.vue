<template>
  <div class="day">
    <h1 id="date">{{ $store.state.selectedDay.selectedFormatted }}</h1>
    <div id="gridHolder">
      <b-card-group deck class="container">
        <b-card v-for="event in getTodaysEvents()" :key="event.id">
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

            <b-button
              id="edit"
              href="#"
              size="lg"
              variant="secondary"
              @click="editEvent(event)"
              >Edit</b-button
            >
            <b-button
              id="remove"
              variant="red"
              class="h1 mb-2"
              @click="removeAction(event.id)"
              >Remove</b-button
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
import Event from '@/components/Event.vue';

export default {
  name: 'Day',
  data() {
    return {
      modalShow: false,
      editShow: false,
      currentEvent: null
    };
  },

  methods: {
    editEvent(event) {
      this.currentEvent = event;
      this.modalShow = true;
    },
    onCancel() {
      this.currentEvent = null;
      this.modalShow = false;
    },
    onOk() {
      this.currentEvent = null;
      this.modalShow = false;
    },

    createEvent() {
      this.modalShow = true;
    },
    onClose() {
      this.currentEvent = null;
      this.modalShow = false;
    },
    getTodaysEvents() {
      let todayEvents = [];
      this.$store.state.events.forEach((element) => {
        if (element.date === this.$route.params.day) {
          todayEvents.push(element);
        }
      });

      for (let x = 0; x < todayEvents.length; x++) {
        let startNumber = parseInt(todayEvents[x].startTime.slice(0, 2));

        todayEvents[x].startNumber = startNumber;

        let endNumber = parseInt(todayEvents[x].endTime.slice(0, 2));

        todayEvents[x].styles = {
          backgroundColor: todayEvents[x].color,
          height: `${(endNumber - startNumber) * 2}rem`,
          marginTop: `${startNumber * 2}rem`,
          position: 'absolute',
          width: '60%'
        };
      }

      todayEvents.sort(function(a, b) {
        return a.startNumber - b.startNumber;
      });

      console.log(todayEvents);
      return todayEvents;
    },
    removeAction(id) {
      this.$store.dispatch('deleteEvent', id);
    }
  },
  components: { Event }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 10px;
}
.text-wrapper {
  background: #fff;
  border: 2px solid black;
  margin-bottom: 20px;
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
  height: 70vh;
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
</style>
