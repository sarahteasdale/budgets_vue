<template>
  <div v-if="isEmpty">
    <div class="container empty-box">
      <p>
       This Service has no Budgets
      </p>
    </div>
  </div>
  <div v-else>
    <div class="container-fluid">
      <div class="row">
        <div id="items" class="col-md-3 text-center">
          <div v-for="item in items" :key="item.id">
            <img :class="{ selected: isSelected(item) }"          
                 :alt="item.service.name"
                 @click="selectItem(item)">
          </div>
        </div>
        <div id="selected-item" class="col-md-9">
          <BudgetItem :item="selectedOrFirstItem" 
                         :key="selectedOrFirstItem.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BudgetItem from "@/components/BudgetItem";

export default {
  components: {
    BudgetItem
  },
  data() {
    return {
      selectedItem: null
    };
  },
  created() {
    this.$store.dispatch("getBudgetItems");
  },
  computed: {
    items() {
      return this.$store.state.budgetItems;
    },
    isEmpty() {
      return this.items.length == 0;
    },
    selectedOrFirstItem() {
      return this.selectedItem || this.items[0];
    }
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item;
    },
    isSelected(item) {
      return this.selectedOrFirstItem.id === item.id;
    }
  }
};
</script>

<style scoped lang="scss">
#items {
  img {
    width: 175px;
    padding: 10px;
    cursor: pointer;
  }

  img.selected {
    border: 4px solid #5198FF;
  }
}

.empty-box {
  font-size: 2rem;
  color: #1E1E1E;
  text-align: center;
  padding: 2rem;
  border: 3px dashed #5198FF;
}
</style>
