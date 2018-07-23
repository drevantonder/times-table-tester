<template>
  <div class="container has-text-centered has-text-white">
    <h1 class="title">LeaderBoard</h1>

    <b-tabs>
      <b-tab-item v-for="league in leagues" :key="league.id" :label="league.name">
        <ul>
          <li v-for="score in sortScores(scores[league.id])" :key="score.id">{{ score.score }}</li>
        </ul>
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
      return Object.values(scores).sort((a, b) => a.score < b.score);
    }
  },

  firestore: {
    leagues: leagues
  }
};
</script>
