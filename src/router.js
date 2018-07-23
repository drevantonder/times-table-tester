import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import LeaderBoard from "./views/LeaderBoard.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/leaderboard",
      name: "leaderboard",
      component: LeaderBoard
    }
  ]
});
