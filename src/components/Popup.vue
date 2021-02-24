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

.popups{
  display: relative;
  box-shadow: 7px 7px 3px rgba(88, 87, 75, 0.5);
  width: 50vh;
  height: 40vh;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  background-color: rgba(255, 255, 255, 0.982)


}


</style>