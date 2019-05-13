<template>
  <div class="container">
    <div v-show="isLoading" class="spinner">
      <i class="fas fa-spinner fa-spin"></i>
    </div>
    <div class="row">
      <div v-for="service in services" :key="service.id" class="col-md-4">
        <Service :service="service"/>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import Service from "@/components/Service";

export default {
  components: {
    Service
  },
  data() {
    return {
      services: [],
      isLoading: true
    };
  },
  created() {
    api.getServices().then(response => {
      this.services = response.data;
      this.isLoading = false;
    });

    this.$store.dispatch("getBudgetItems");
  }
};
</script>

<style scoped lang="scss">
.row {
  display: -webkit-flex; /* Safari */
  -webkit-flex-flow: row wrap; /* Safari 6.1+ */
  display: flex;
  flex-flow: row wrap;
  width: auto;
  margin: auto;
}

.spinner {
  font-size: 7rem;
  text-align: center;
}
</style>