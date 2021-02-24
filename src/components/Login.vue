<template>
  <div class="form-look">
    <div class="vue-tempalte">
      <form @submit.prevent="signUpPage">
        <h3>Log In</h3>

        <div class="form-group">
          <label>Email address</label>
          <input
            type="email"
            class="form-control form-control-lg"
            v-model="email"
            id="email"
          />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input
            id="password"
            type="password"
            class="form-control form-control-lg"
            v-model="password"
          />
        </div>

        <button
          @click="signUpPage"
          type="submit"
          class="btn btn-dark btn-lg btn-block"
        >
          Log In
        </button>

        <p class="forgot-password text-right mt-2 mb-4">
          Registered Here
          <router-link to="/SignUp">SignUp!</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async signUpPage() {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        // eslint-disable-next-line no-unused-vars
        .then((userCredential) => {
          this.$router.replace("/HelloWorld");
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
};
</script>