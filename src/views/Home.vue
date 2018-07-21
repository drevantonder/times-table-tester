<template>
  <div class="container has-text-centered">
    <template v-if="started">
      <h1 class="question">
          {{ number1 }} &times; {{ number2 }} = <input v-model="answer" class="answer-input" type="number" autofocus :min="minAnswer" :max="maxAnswer">
      </h1>
      <h2 class="has-text-success">
        {{ finished }} - <span v-if="minutes >= 1">{{ minutes }}m</span> {{ seconds }}s
      </h2>
    </template>
    <button v-else class="button is-rounded is-large is-success" @click="start">
      Start
    </button>  
    
  </div>
</template>

<script>
import moment from "moment";

const MAX_MULTIPLE = 12;

export default {
  data() {
    return {
      number1: 0,
      number2: 0,
      answer: null,
      minAnswer: 0,
      maxAnswer: 144,
      started: false,
      finished: 0,

      timeStarted: null,
      timeTaken: 0,
      interval: null
    };
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
    }
  },

  watch: {
    answer() {
      if (this.answer == this.number1 * this.number2) {
        this.correctAnswer();
      }
    }
  },

  beforeDestroy() {
    clearInterval(this.interval);
  },

  methods: {
    start() {
      this.started = true;

      this.timeStarted = Date.now();

      this.next();

      this.interval = setInterval(
        () => (this.timeTaken = Date.now() - this.timeStarted),
        100
      );
    },

    next() {
      this.answer = null;
      this.number1 = Math.round(Math.random() * MAX_MULTIPLE);
      this.number2 = Math.round(Math.random() * MAX_MULTIPLE);
    },

    correctAnswer() {
      this.finished += 1;
      this.next();
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
</style>
