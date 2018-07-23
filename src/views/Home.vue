<template>
  <div class="center">
    <div class="container has-text-centered">
      <template v-if="status == Status.BeforeGame">
        <h1 class="is-size-2">Times Table Tester</h1>
        <p class="is-size-4">Solve as many as you can</p>
      </template>

      <template v-else-if="status == Status.InGame">
        <h1 class="question">
            {{ number1 }} &times; {{ number2 }} = <input v-model="answer" class="answer-input" type="number" autofocus :min="minAnswer" :max="maxAnswer">
        </h1>
        <h2 class="subtitle">
          {{ finished }} - <span v-if="minutes >= 1">{{ minutes }}m</span> {{ seconds }}s
        </h2>
      </template>

      <template v-else-if="status == Status.AfterGame">
        <h1 class="is-size-2">You finished {{ finished }} in {{ duration }} min.</h1>
      </template>

      <template v-if="status == Status.AfterGame || status == Status.BeforeGame">
        <div class="lets-go">
          <b-field grouped group-multiline position="is-centered">
            <b-input v-model="name" placeholder="Name.." type="text" />
            <select-league v-model="selectedLeague" :leagues="leagues" />
            <div class="control">
              <button class="button is-primary" @click="start">
                <template v-if="status == Status.BeforeGame">Lets Go!</template>
                <template v-else>Go Again!</template>
              </button>
            </div>
          </b-field>
        </div>
      </template>  
    
    </div>

    <b-modal :active.sync="getNameModal">
      <b-field label="Don't lose your score to Mr Anonymous">
        <b-input v-model="name" placeholder="Name.." type="text" />
      </b-field>
      <button v-if="anonymous" class="button is-danger" @click="publish('Mr Anonymous')" >I am feeling generous today</button>
      <button v-else class="button is-primary" @click="publish(name)">Publish</button>
    </b-modal>
  </div>
</template>

<script>
import SelectLeague from "@/components/SelectLeague.vue";

import moment from "moment";

import firebase from "@/firebase";
const db = firebase.firestore();

const leagues = db.collection("leagues");

const Status = {
  BeforeGame: 1,
  InGame: 2,
  AfterGame: 3
};

const MAX_MULTIPLE = 12;

export default {
  components: {
    SelectLeague
  },

  data() {
    return {
      number1: 0,
      number2: 0,
      answer: null,
      minAnswer: 0,
      maxAnswer: 144,
      status: Status.BeforeGame,
      finished: 0,

      timeStarted: null,
      timeTaken: 0,
      interval: null,

      Status: Status,

      selectedLeague: null,
      leagues: [],

      name: "",
      getNameModal: false
    };
  },

  firestore: {
    leagues: leagues
  },

  computed: {
    seconds() {
      return moment.duration(this.timeTaken).seconds();
    },

    minutes() {
      return moment
        .duration(this.timeTaken)
        .asMinutes()
        .toString()
        .split(".")[0];
    },

    duration() {
      return this.selectedLeague.speed;
    },

    anonymous() {
      return this.name == null || this.name === "";
    }
  },

  watch: {
    answer() {
      if (this.answer == this.number1 * this.number2) {
        this.correctAnswer();
      }
    },

    leagues() {
      if (!this.selectedLeague) {
        this.selectedLeague = this.leagues[0];
      }
    }
  },

  beforeDestroy() {
    clearInterval(this.interval);
  },

  methods: {
    start() {
      this.finished = 0;

      this.status = Status.InGame;

      this.timeStarted = Date.now();

      this.next();

      this.interval = setInterval(
        () => (this.timeTaken = Date.now() - this.timeStarted),
        100
      );

      setTimeout(() => this.gameOver(), 1000 * 60 * this.duration);
    },

    next() {
      this.answer = null;
      this.number1 = Math.round(Math.random() * MAX_MULTIPLE);
      this.number2 = Math.round(Math.random() * MAX_MULTIPLE);
    },

    correctAnswer() {
      this.finished += 1;
      this.next();
    },

    gameOver() {
      this.status = Status.AfterGame;

      if (!this.anonymous) {
        this.publish(this.name);
      } else {
        this.showGetNameModal();
      }
    },

    showGetNameModal() {
      this.getNameModal = true;
    },

    hideGetNameModal() {
      this.getNameModal = false;
    },

    publish(name) {
      leagues
        .doc(this.selectedLeague.id)
        .collection("scores")
        .add({
          name: name,
          score: this.finished
        });

      this.hideGetNameModal();
    }
  }
};
</script>

<style lang="scss">
$size: 3rem;

.question {
  font-size: $size;
}

.answer-input {
  background-color: transparent;
  border: none;
  border-bottom: 3px solid white;
  font-size: $size;
  padding: 4px;
  color: white;
  width: calc(28px * 3);
}

.answer-input::-webkit-outer-spin-button,
.answer-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.answer-input:focus {
  outline: none;
}

.lets-go {
  margin-top: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
