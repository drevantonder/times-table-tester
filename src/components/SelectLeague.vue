<template>
  <b-select placeholder="Select a League" v-model="newValue" @change="$emit('input', newValue)" v-bind="$attrs">
    <option
      v-for="(league, key) in leagues"
      :value="league"
      :key="key">
      {{ league.name }} - {{ league.speed }}min
    </option>
  </b-select>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    leagues: {
      required: true,
      type: Array
    },

    value: {
      required: true
    }
  },

  data() {
    return {
      newValue: this.value
    };
  },

  watch: {
    value(value) {
      this.newValue = value;
    },

    newValue(value) {
      this.$emit("input", value);
    }
  }
};
</script>
