<template>

  <div id="app">
    <div id="background" />
    <router-view/>
  </div>
</template>

<style lang="scss">
#background {
  height: 100vh;
  width: 100%;
  position: fixed;

  background-color: #08aeea;
  background-image: linear-gradient(151deg, #08aeea 0%, #2af598 100%);
}
</style>
