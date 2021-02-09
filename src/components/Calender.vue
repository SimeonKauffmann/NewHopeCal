<template>
  <b-container class="bv-example-row">
    <b-row variant="danger">
      <b-col md="auto">
        <b-calendar
          @selected="onClick"
          class="bg-primary"
          width="350px"
          v-model="value"
          @context="onContext"
          locale="en-US"
          today-variant="danger"
          selected-variant="danger"
        ></b-calendar>
      </b-col>
      <b-col>
        <p>
          Value: <b>'{{ value }}'</b>
        </p>
        <p class="mb-0">Context:</p>
        <pre class="small">{{ context }}</pre>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import router from "../router";
export default {
  name: "Calender",

  data() {
    return {
      startDate: null,
      slutDate: null,
      value: "",
      context: null,
    };
  },
  methods: {
    onContext(ctx) {
      this.context = ctx;
    },

    onClick(ymd, date) {
      const day = date.getDate();
      router.push({ path: `/edit/${day}` });
    },
  },
  components: {},
};
</script>

<style></style>
