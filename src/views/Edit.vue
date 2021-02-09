<template>
  <div class="Edit">
    <b-icon-plus-circle class="h1 mb-2" @click="onClick"></b-icon-plus-circle>

    <b-modal v-model="modalShow">Hello From Modal!</b-modal>
  </div>
</template>

<script>
export default {
  name: "Edit",
  data() {
    return {
      modalShow: false,
    };
  },
  methods: {
    onClick() {
      this.modalShow = true;
    },
  },
};
</script>
