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
      <label for="">
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
    </b-modal>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default Vue.extend({
    name: 'Event',

    props: {
      show: Boolean,
      event: null
    },

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

        return this.event == null ? newEvent : Object.assign({}, this.event)
      }
    }
  })
</script>
