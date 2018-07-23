<template>
  <div class="container">
    <h1 class="title">LeaderBoard</h1>

    <b-tabs>
      <b-tab-item v-for="league in leagues" :key="league.id" :label="league.name">
        <section class="has-text-centered">
          <h1 class="title">{{ league.name }}</h1>
          <h2 class="subtitle">{{ league.speed }}min</h2>
          <ul>
            <li v-for="score in sortScores(scores[league.id])" :key="score.id">{{ score.name }} - {{ score.score }}</li>
            <li v-if="!sortScores(scores[league.id]).length">No scores here. Why not be the first. </li>
          </ul>
        </section>
      </b-tab-item>
    </b-tabs>
  </div>    
</template>

<script>
import firebase from "@/firebase";
const db = firebase.firestore();

const leagues = db.collection("leagues");

export default {
  data() {
    return {
      leagues: leagues,
      scores: {}
    };
  },

  watch: {
    leagues() {
      this.leagues.forEach(league => {
        this.$set(this.scores, league.id, {});
        let scores = this.scores[league.id];
        this.$firestoreRefs.leagues
          .doc(league.id)
          .collection("scores")
          .get()
          .then(
            function(querySnapshot) {
              querySnapshot.forEach(
                function(doc) {
                  this.$set(scores, doc.id, {
                    id: doc.id,
                    ...doc.data()
                  });
                }.bind(this)
              );
            }.bind(this)
          );
      });
    }
  },

  methods: {
    sortScores(scores) {
      return Object.values(scores).sort((a, b) => b.score - a.score);
    }
  },

  firestore: {
    leagues: leagues
  }
};
</script>
