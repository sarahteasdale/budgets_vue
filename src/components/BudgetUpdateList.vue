<template>
  <div class="container">
    <table class="table table-striped">
      <transition-group tag="tbody" name="fade">
        <tr v-for="theBudget in budgets" :key="theBudget.id">
          <td class="date">{{ theBudget.created_at | formatDate }}</td>
          <td class="budgetType">{{ theBudget.budgetType }}</td>
          <td class="startDate">started at {{ theBudget.startDate }} </td>
          <td class="endDate">ended at {{ theBudget.endDate }} </td>
        </tr>
      </transition-group>
    </table>
  </div>
</template>

<script>
import dateFns from "date-fns";

export default {
  props: {
    budgets: {
      type: Array,
      required: true
    }
  },
  filters: {
    formatDate(date) {
      return dateFns.format(date, "MMMM Do [at] h:mm a");
    }
  }
};
</script>

<style scoped lang="scss">
table {
  margin-top: 2rem;

  td.weight,
  td.length {
    text-align: right;
    padding-right: 3rem;
  }
}
</style>
