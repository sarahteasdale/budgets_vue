<template>
  <div class="container">
    <Errors :errors="errors" />
    <form @submit.prevent="logBudgetUpdate">
      <div class="form-row">
        <div class="col">
          <div class="input-group">
            <select class="form-control" ref="budgetType"
                    v-model="theBudget.budgetType" 
                    required>
              <option disabled value="">Budget Type</option>
              <option v-for="budgetType in budgetTypes"
                      :key="budgetType" :value="budgetType">
                {{ budgetType }}
              </option>
            </select>
          </div>
        </div>
        <div class="col">
          <div class="input-group">
            <input class="form-control"
                    type="date"
                    required
            <div class="input-group-append">
              <span class="input-group-text">Start Date</span>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group">
            <input class="form-control"
                    type="date"
                    required
            <div class="input-group-append">
              <span class="input-group-text">End Date</span>
            </div>
          </div>
        </div>
        <div class="col">
          <button type="submit" class="btn btn-outline-secondary">
            Update Budget
          </button>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
import api from "@/api";
import Errors from "@/components/Errors";

export default {
  components: { Errors },
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      theBudget: this.newBudget(),
      errors: {},
      budgetType: [
        "Rent"
      ]
    };
  },
  methods: {
    newBudget() {
      return {
        budgetType: "",
        startDate: "",
        endDate: ""
      };
    },
    logBudgetUpdate() {
      api
        .createBudget(this.service.id, this.theBudget)
        .then(response => {
          this.$emit("budget-created", response.data);
          this.reset();
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    reset() {
      this.theBudget = this.newBudget();
      this.errors = {};
      this.setFocus();
    },
    setFocus() {
      this.$refs.budgetType.focus();
    }
  },
  mounted() {
    this.setFocus();
  }
};
</script>

<style scoped lang="scss">
.btn {
  color: #5198FF;
  border-color: #5198FF;
  text-transform: uppercase;

  &:hover {
    background-color: #5198FF;
    color: white;
  }
}
</style>
