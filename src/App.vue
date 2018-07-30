<template>
  <div id="app">
    <nav id="navbar" class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" @click="toggleNavbarMenu()">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" :class="{'is-active': activeNavbarMenu}">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Game</router-link>
          <router-link class="navbar-item" to="/leaderboard">LeaderBoard</router-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <b-field>
              <p class="control">
                <span class="button is-static">Theme</span>
              </p>
              <label class="is-sr-only" for="theme">Name</label>
              <b-select id="theme" placeholder="Theme" v-model="theme">
                <option
                  v-for="theme in themes"
                  :value="Theme[theme]"
                  :key="theme">
                  {{ theme }}
                </option>
              </b-select>
            </b-field>
          </div>
          <a class="navbar-item" aria-label="Github Repository" href="https://github.com/DrevanTonder/times-table-tester"><font-awesome-icon :icon="['fab', 'github']" /></a>
        </div>  
      </div>
    </nav>
    <div id="background" :class="{'theme-teal': theme === Theme.Teal, 'theme-pink': theme === Theme.Pink, 'theme-red': theme === Theme.Red }" />
    <router-view />
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
      activeNavbarMenu: false,

      Theme: Theme
    };
  },

  computed: {
    themes() {
      return Object.keys(Theme);
    }
  },

  mounted() {
    window.addEventListener("click", () => this.hideNavbarMenu());

    document
      .querySelector("#navbar")
      .addEventListener("click", event => event.stopPropagation());
  },

  methods: {
    toggleNavbarMenu() {
      if (this.activeNavbarMenu) {
        this.hideNavbarMenu();
      } else {
        this.showNavbarMenu();
      }
    },

    showNavbarMenu() {
      this.activeNavbarMenu = true;
    },

    hideNavbarMenu() {
      this.activeNavbarMenu = false;
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

  top: 78px;
  bottom: 0;

  z-index: -1000;
}

.theme-teal {
  background-color: #2af598;
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
