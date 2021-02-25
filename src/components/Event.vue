<template>
  <div>
    <b-modal
      :visible="show"
      @ok="saveEvent"
      @close="onClose"
      @cancel="onCancel"
    >
      <h1>New Event</h1>
      <input
        id="newEventInput"
        v-model="currentEvent.title"
        type="text"
        placeholder="Event Name.."
        style="margin-bottom: 1rem"
      />
      <br />
      <label style="margin-right: 1rem">
        Starts:
        <input v-model="currentEvent.startTime" type="time" />
      </label>
      <label> Ends: <input v-model="currentEvent.endTime" type="time"/></label>
      <label for="" v-if="!currentEvent.id">
        Share event? (separated by spaces)
        <input type="text" v-model="currentEvent.share" />
      </label>
      <div>
        <label>
          <textarea
            v-model="currentEvent.text"
            style="margin-top: 0.5rem"
            placeholder="Write something.."
          ></textarea>
        </label>
      </div>

      <div>
        <b-form-radio-group
          id="event-type"
          v-model="currentEvent.type"
          :options="options"
          class="mb-3"
          value-field="item"
          text-field="name"
          disabled-field="notEnabled"
        ></b-form-radio-group>
        <div class="mt-3"></div>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default Vue.extend({
    name: 'Event',
    data() {
      // set different types for radio buttons -Sofia
      return {
        options: [
          { item: 'None', name: 'None' },
          { item: 'Work', name: 'Work' },
          { item: 'Sport', name: 'Sport' },
          { item: 'Fun', name: 'Fun' }
        ]
      }
    },
    props: {
      show: Boolean,
      event: null
    },
    // save the event in VueX and making id in case the event already exist(edited) -Sofia
    methods: {
      saveEvent() {
        if (this.currentEvent.id === null) {
          this.currentEvent.id =
            this.currentEvent.date +
            this.currentEvent.text +
            this.currentEvent.title +
            this.currentEvent.startTime
          this.$store.dispatch('saveInfo', this.currentEvent)
        } else {
          this.$store.dispatch('saveUpdateInfo', this.currentEvent)
        }

        this.$emit('ok')
      },
      onClose() {
        this.$emit('close')
      },
      onCancel() {
        this.$emit('cancel')
      }
    },
    // If prop-event is null make a newEvent if not create a copy of current event-Sofia
    computed: {
      currentEvent() {
        const newEvent = {
          date: this.$route.params.day,
          title: null,
          startTime: '09:00',
          endTime: '10:00',
          text: null,
          id: null,
          share: null
        }

        return this.event === null ? newEvent : Object.assign({}, this.event)
      }
    }
  })
</script>

<style>
  #event-type_BV_option_0 + label::before {
    background-color: rgba(229, 152, 118, 1);
  }
  #event-type_BV_option_1 + label::before {
    background-color: rgba(96, 139, 150, 1);
  }
  #event-type_BV_option_2 + label::before {
    background-color: rgba(132, 146, 131, 1);
  }
  #event-type_BV_option_3 + label::before {
    background-color: rgb(246, 189, 96);
  }
</style>
