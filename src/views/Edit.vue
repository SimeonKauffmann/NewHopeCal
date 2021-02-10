<template>
  <div class="Edit">
    <b-icon-plus-circle class="h1 mb-2" @click="onClick"></b-icon-plus-circle>
    <div>{{ $store.state.information }}</div>
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
        <input v-model="startTime" placeholder="Starts time" />
      </label>
      <label> Ends: <input v-model="endTime" placeholder="End time "/></label>
      <div>
        <label>
          <textarea v-model="text"></textarea>
        </label>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Edit",
  data() {
    return {
      title: null,
      startTime: null,
      endTime: null,
      text: null,
      modalShow: false,
    };
  },
  methods: {
    onClick() {
      this.modalShow = true;
    },
    createEvent(title, startTime, endTime, text) {
      var info = {
        title: title,
        startTime: startTime,
        endTime: endTime,
        text: text,
      };

      this.$store.dispatch("saveInfo", info);
    },
  },
};
</script>
<style>
textarea {
  width: 300px;
  height: 150px;
}
.Edit {
  float: right;
}
#newEventInput {
  margin-bottom: 1rem;
}
</style>
