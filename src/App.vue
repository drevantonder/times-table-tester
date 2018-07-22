<template>

  <div id="app">
    <section id="hero" class="hero is-primary is-bold is-fullheight">
      <div class="hero-head">
        <header class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <span class="navbar-burger burger" data-target="navbarMenuHeroC">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id="navbarMenuHeroC" class="navbar-menu">
              <div class="navbar-start">
                <router-link class="navbar-item" to="/">Home</router-link>
              </div>
            </div>
          </div>
        </header>
      </div>

      <div class="hero-body">
        <router-view/>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
#hero {
  background-color: #08aeea;
  background-image: linear-gradient(151deg, #08aeea 0%, #2af598 100%);
}
</style>
