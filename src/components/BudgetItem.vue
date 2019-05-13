<template>
  <div class="card">
    <div class="card-header">
      <img class="service" 
           :alt="item.service.name">
      <h5>
        <span class="count">{{ totalBudgetUpdates() }}</span>
        changes made
      </h5>
    </div>
    <div class="card-body">
      <h4 class="card-title">{{ item.service.name }}</h4>
      <h5 class="card-subtitle">{{ item.service.category }}</h5>
    </div>
    <div class="card-footer">
      <BudgetUpdateForm :service="item.service" @budgets-created="onBudgetCreated"/>
      <BudgetUpdateList :budgets="budgets"/>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import BudgetUpdateForm from "@/components/BudgetUpdateForm";
import BudgetUpdateList from "@/components/BudgetUpdateList";

export default {
  components: {
    BudgetUpdateForm,
    BudgetUpdateList
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      budgets: []
    };
  },
  created() {
    api.getBudget(this.item.service.id).then(response => {
      this.budgets = response.data;
    });
  },
  methods: {
    onBudgetCreated(newBudget) {
      this.budgets.unshift(newBudget);
    },
    totalBudgetUpdates() {
      return this.budgets.length || 0;
    }
  }
};
</script>

<style scoped lang="scss">
.card {
  .card-header {
    color: #1E1E1E;
    border: 0;
    margin-bottom: 15px;

    h5 {
      color: #212121;
    }

    img.service {
      width: 275px;
      padding: 0 0.5rem;
    }

    .count{
      font-weight: 800;
    }
  }
}

@media (min-width: 768px) {
  .card {
    flex-direction: row;
    flex-wrap: wrap;

    .card-body {
      padding-top: 3rem;
    }
  }
}
</style>
