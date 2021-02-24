<template>
  <div class="popups">
    <div class="popup-inner">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    props: ['TogglePopup']
  }
</script>

<style lang="scss" scoped>
  .popups {
    display: relative;
    width: 50vh;
    height: 40vh;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    border-radius: 40px;
    background-color: rgba(255, 255, 255, 0.982);
  }
</style>
