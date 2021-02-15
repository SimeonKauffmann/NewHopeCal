<template>
  <div>
    <b-modal
      :visible="show"
      @ok="saveEvent(currentEvent)"
      @close="onClose"
      @cancel="onCancel"
    >
      <h1>New Event</h1>
      <input
        id="newEventInput"
        v-model="currentEvent.title"
        type="text"
        placeholder="Event Name.."
        style="margin-bottom:1rem"
      />
      <br />
      <label style="margin-right:1rem">
        Starts:
        <input v-model="currentEvent.startTime" type="time" />
      </label>
      <label> Ends: <input v-model="currentEvent.endTime" type="time"/></label>
      <div>
        <label>
          <textarea
            v-model="currentEvent.text"
            style="margin-top:0.5rem"
            placeholder="Write something.."
          ></textarea>
        </label>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "Event",

  props: {
    show: Boolean,
    event: null,
  },

  methods: {
    saveEvent(currentEvent) {
      if (currentEvent.id != null) {
        this.$store.dispatch("saveInfo", currentEvent);
      } else {
        currentEvent.id =
          currentEvent.date +
          currentEvent.text +
          currentEvent.title +
          currentEvent.startTime;
        this.$store.dispatch("saveInfo", currentEvent);
      }

      this.$emit("ok");
      console.log(currentEvent);
    },
    onClose() {
      this.$emit("close");
    },
    onCancel() {
      this.$emit("cancel");
    },
  },
  computed: {
    currentEvent() {
      if (this.event != null) {
        return {
          date: this.$route.params.day,
          title: this.event.title,
          startTime: this.event.startTime,
          endTime: this.event.endTime,
          text: this.event.text,
          id: this.event.id,
        };
      } else {
        return {
          date: this.$route.params.day,
          title: null,
          startTime: null,
          endTime: null,
          text: null,
          id: null,
        };
      }
    },
  },
});
</script>
