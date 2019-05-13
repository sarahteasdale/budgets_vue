<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ service.name }}</h5>
      <router-link v-if="isInBudget(service)"
                   class="btn btn-secondary"
                   to="/budget">
          Change Budget
      </router-link>
      <button v-else
              class="btn btn-outline-secondary"
              @click="addToBudget(service)">
        <i class="fas fa-toolbox"></i>   
        Update Budget
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  computed: {
    budgetItems() {
      return this.$store.state.budgetItems;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    isInBudget(service) {
      return this.budgetItems.find(item => item.service.id === service.id);
    },
    addToBudget(service) {
      if (this.isAuthenticated) {
        this.$store.dispatch("createBudgetItem", service.id);
      } else {
        this.$router.push("sign-in");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.card {
  margin-bottom: 1.5rem;
  padding-bottom: 5px;
  padding-top: 1px;
  text-transform: uppercase;
  margin-right: 10px;


  .btn {
    font-size: 12px;
    border: #5198FF solid thin;
    border-radius: 4px;
  }

  .btn:hover {
      background-color: #5198FF;
      color: #FFF;
    }

  .fa-toolbox {
    margin-right: 3px;
  }
}
</style>
