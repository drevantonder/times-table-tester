<template>

  <div id="app">
    <section class="hero is-primary is-bold is-fullheight">
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
