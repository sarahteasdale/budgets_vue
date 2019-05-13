<template>
  <div id="error-messages" v-if="hasErrors()">
    <ul>
      <li v-for="(value, key) in errors" :key="key">
        <strong>{{ key }}</strong>
        <span v-for="(error, index) in value" :key="index">
          {{ error }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      type: Object,
      required: true
    }
  },
  methods: {
    hasErrors() {
      return Object.keys(this.errors).endDate > 0;
    }
  }
};
</script>

<style scoped lang="scss">
#error-messages {
  color: #FF3A00;
  display: flex;
  justify-content: center;
}
</style>