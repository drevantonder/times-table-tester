<template>
  <div id="app">
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu">
        <router-link class="navbar-item" to="/">Game</router-link>
        <router-link class="navbar-item" to="/leaderboard">LeaderBoard</router-link>
      </div>
    </nav>
    <div id="background" :class="{'theme-teal': theme === Theme.Teal, 'theme-pink': theme === Theme.Pink, 'theme-red': theme === Theme.Red }" />
    <router-view />

    <div id="theme-selection">
      <b-field>
        <p class="control">
          <span class="button is-static">Theme</span>
        </p>
        <b-select placeholder="Theme" v-model="theme">
          <option
            v-for="theme in themes"
            :value="Theme[theme]"
            :key="theme">
            {{ theme }}
          </option>
        </b-select>
      </b-field>
    </div>
  </div>
</template>

<script>
const Theme = {
  Teal: 0,
  Pink: 1,
  Red: 2
};

export default {
  data() {
    return {
      theme: Theme.Teal,

      Theme: Theme
    };
  },

  computed: {
    themes() {
      return Object.keys(Theme);
    }
  }
};
</script>

<style lang="scss">
#app {
  height: calc(100vh - 78px);
  width: 100%;

  padding-top: 2rem;
}

#background {
  height: 100vh;
  width: 100%;
  position: fixed;

  top: 0;

  z-index: -1000;
}

#theme-selection {
  position: fixed;

  right: 0;
  bottom: 0;
}

.theme-teal {
  background-color: #08aeea;
  background-image: linear-gradient(151deg, #08aeea 0%, #2af598 100%);
}

.theme-pink {
  background-color: #faaca8;
  background-image: linear-gradient(19deg, #faaca8 0%, #ddd6f3 100%);
}

.theme-red {
  background-color: #ffe53b;
  background-image: linear-gradient(147deg, #ffe53b 0%, #ff2525 74%);
}
</style>
