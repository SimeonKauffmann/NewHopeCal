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
        v-model="event.title"
        type="text"
        placeholder="Event Name.."
        style="margin-bottom:1rem"
      />
      <br />
      <label style="margin-right:1rem">
        Starts:
        <input v-model="event.startTime" type="time" />
      </label>
      <label> Ends: <input v-model="event.endTime" type="time"/></label>
      <div>
        <label>
          <textarea
            v-model="event.text"
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
    saveEvent() {
      if (this.event.id != null) {
        this.$store.dispatch("saveInfo", this.event);
      } else {
        this.event.id =
          this.event.date +
          this.event.text +
          this.event.title +
          this.event.startTime;
        this.$store.dispatch("saveInfo", this.event);
      }

      this.$emit("ok");
    },
    onClose() {
      this.$emit("close");
    },
    onCancel() {
      this.$emit("cancel");
    },
  },
});
</script>
