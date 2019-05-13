<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <h2 class="text-center">Sign In</h2>
        <h5 class="text-center">
          <router-link to="/sign-up">
            Need an account?
          </router-link>
        </h5>
        <p v-if="$route.query.redirect" class="error text-center">
          You need to sign in first.
        </p>
        <p v-if="error" class="error">
          {{ error }}
        </p>
        <form @submit.prevent="signIn" autocomplete="off">
          <div class="form-group">
            <input v-model.trim="username"
                   class="form-control"
                   placeholder="Username"
                   required>
          </div>
          <div class="form-group">
            <input v-model.trim="password"
                   class="form-control"
                   placeholder="Password"
                   type="password"
                   required>
          </div>
          <button type="submit" class="btn btn-info btn-block">
            Sign In
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    signIn() {
      this.$store
        .dispatch("signIn", {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.replace(this.$route.query.redirect || "/");
        })
        .catch(error => {
          this.error = error;
        });
    }
  }
};
</script>

<style scoped lang="scss">
.row {
  margin: 0px auto;
  margin-top: -50px;
  width: 200px;
}

form {
  .form-group {
    padding-bottom: 4px;
  }
  
}
.error {
  color: #FF3A00;
  text-align: center;
}

.btn {
  font-size: 12px;
  border: #5198FF solid thin;
  border-radius: 4px;
  display: inline-block;
  text-align: center;
  width: 50%;
  margin-left: 5%;
}
  
.btn:hover {
  background-color: #5198FF;
  color: #FFF;
}



</style>
