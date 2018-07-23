<template>
  <b-field>
    <b-select placeholder="Select a League" v-model="newValue" @change="$emit('input', newValue)">
      <option
        v-for="(league, key) in leagues"
        :value="league"
        :key="key">
        {{ league.name }} - {{ league.speed }}min
      </option>
    </b-select>
    <div class="control">
      <slot />
    </div>  
  </b-field>
</template>

<script>
export default {
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
