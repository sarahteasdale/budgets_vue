<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <h2 class="text-center">Sign Up</h2>
        <h5 class="text-center">
          <router-link to="/sign-in">
            Already have an account?
          </router-link>
        </h5>
        <Errors :errors="errors" />
        <form @submit.prevent="signUp">
          <div class="form-group">
            <input v-model.trim="username"
                   class="form-control"
                   placeholder="Username"
                   required>
          </div>
          <div class="form-group">
            <input v-model.trim="password"
                   class="form-control"
                   type="password"
                   placeholder="Password"
                   required>
          </div>
          <button type="submit" class="btn btn-info btn-block">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Errors from "@/components/Errors";

export default {
  components: { Errors },
  data() {
    return {
      username: "",
      password: "",
      errors: {}
    };
  },
  methods: {
    signUp() {
      this.$store
        .dispatch("signUp", {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.errors = {};
          this.$router.push("services");
        })
        .catch(errors => {
          this.errors = errors;
        });
    }
  }
};
</script>

<style scoped lang="scss">
.row {
  margin: 0 auto;
  margin-top: -50px;
  width: 200px;
}
form {
  
  .form-group{
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
