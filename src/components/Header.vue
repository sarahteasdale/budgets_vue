<template>
  <header>
    <div class="bg-colour-primary">
    <nav class="navbar navbar-expand navbar-primary">
      <div class="container">
        <a class="navbar-brand"></a>
        <ul class="navbar-nav">
          <template v-if="isAuthenticated">
            <li class="nav-item">
              <a @click="signOut">Sign Out</a>
            </li>
            <li class="nav-item user">
              <i class="far fa-user"></i>
              {{ username }}
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link to="/sign-in">Sign In</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/sign-up">Sign Up</router-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>
    </div>
    <div class="brand">
      <span class="name">Update Budgets</span>
    </div>
    <nav class="navbar navbar-expand navbar-secondary">
      <div class="container justify-content-center">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/services">Services</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/budgets">Budgets</router-link>
            <span v-if="hasBudgetItems" class="badge badge-pill">{{ BudgetItemCount }}</span>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    BudgetItemCount() {
      return this.$store.getters.BudgetItemCount;
    },
    hasBudgetItems() {
      return this.BudgetItemCount > 0;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    username() {
      return this.$store.state.user.username;
    }
  },
  methods: {
    signOut: function() {
      this.$store.dispatch("signOut").then(() => {
        this.$router.push("sign-in");
      });
    }
  }
};
</script>

<style scoped lang="scss">
.bg-color-primary {
  background-color: #FFF;
  opacity: 0.2;
}

.nav-item {
    list-style-type: none;
    display: inline-block;
    text-align: center;

  a {
    color: #F5F5F5;
    opacity: 0.7;
    text-decoration: none;
    padding-bottom: 2px;

    &.active,
    &:hover {
      color: #F5F5F5;
      opacity: 1;
    }

    &:hover {
      cursor: pointer;
    }
  }
}

.navbar-primary {
  padding-bottom: 5px;
  padding-top: 5px;
  float: right;

  .nav-item {
    margin-right: 15px;

    a {
      font-size: 1rem;
    }

    &.user {
      color: #E0E0E0;
    }
  }
}

.navbar-secondary {
  background-color: #212121;
  padding-bottom: 15px;


  .navbar-nav {
    margin: auto;
    width: 300px;

  }

  .nav-item {
    margin: 0 22px;

    a {
      font-size: 1.5rem;
      padding: 0;
    }
  }

  .badge {
    font-size: 0.85rem;
    font-weight: 400;
    color: #1E1E1E;
    background-color: #FAFAFA;
    vertical-align: top;
    margin-left: 1px;
    font-feature-settings: "tnum";
    font-variant-numeric: tabular-nums;
  }
}

a.router-link-exact-active {
  border-bottom: 2px solid #5198FF;
  opacity: 1;
}

.brand {
  text-align: center;
  background-color: #212121;
  padding: 20px 0 20px 0;
  margin:0;

  .name {
    font-size: 2.6rem;
    font-weight: 600;
    text-transform: uppercase;
    display: inline-block;
    color: #F5F5F5;
  }
}
</style>
