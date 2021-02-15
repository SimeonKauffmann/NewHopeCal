<template>
  <div>
    <b-icon-plus-circle
      id="plus"
      class="h1 mb-2"
      @click="onClick"
    ></b-icon-plus-circle>
    <b-modal
      v-model="modalShow"
      @ok="createEvent(title, startTime, endTime, text)"
    >
      <h1>New Event</h1>
      <input
        id="newEventInput"
        v-model="title"
        type="text"
        placeholder="Event Name.."
      />
      <label>
        Starts:
        <input v-model="startTime" type="time" />
      </label>
      <label> Ends: <input v-model="endTime" type="time" /></label>
      <div>
        <label>
          <textarea v-model="text"></textarea>
        </label>
      </div>
    </b-modal>
  </div>
</template>

<script lang="js">
import Vue from "vue";
export default Vue.extend({
  name: "Event",
  data() {
    return {
      date: null,
      title: null,
      startTime: null,
      endTime: null,
      text: null,
      modalShow: false,
      id: null,
    };
  },
  methods: {
    onClick() {
      this.modalShow = true;
    },
    createEvent(title, startTime, endTime, text) {
      let info = {
        title: title,
        startTime: startTime,
        endTime: endTime,
        text: text,
        date: this.$route.params.day,
        color: "red",
        id: this.date + this.text + this.title + this.startTime,
      };

      this.$store.dispatch("saveInfo", info);
    },
    
  },
  name: "Edit",
});
</script>
