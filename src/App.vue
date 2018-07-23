<template>

  <div id="app">
    <nav id="navbar" class="level has-background-white">
      <div class="level-item has-text-centered">
        <div>
          <router-link to="/">Game</router-link>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <router-link to="/leaderboard">LeaderBoard</router-link>
        </div>
      </div>    
    </nav>  
    <div id="background" />
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  height: 100vh;
  width: 100%;

  padding-top: 2rem;
}

#background {
  height: 100vh;
  width: 100%;
  position: fixed;

  top: 0;

  z-index: -1000;

  background-color: #08aeea;
  background-image: linear-gradient(151deg, #08aeea 0%, #2af598 100%);
}

#navbar {
  position: fixed;

  top: 0;
  width: 100%;
}
</style>
