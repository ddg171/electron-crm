<template>
  <div id="overlay-base">
    <slot />
  </div>
</template>


<style scoped>
#overlay-base {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .7);
  z-index: 2000;
}
</style>
