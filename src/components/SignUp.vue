/* eslint-disable no-unused-vars */
<template>
  <div class="form-look">
    <div class="vue-tempalte">
      <div>
        <h3>Sign Up</h3>
        <div class="form-group">
          <label>Email address</label>
          <input
            type="email"
            class="form-control form-control-lg"
            v-model="email"
          />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input
            type="password"
            class="form-control form-control-lg"
            v-model="password"
          />
        </div>

        <button @click="signUps()" class="btn btn-dark btn-lg btn-block">
          Sign Up
        </button>

        <p class="forgot-password text-right">
          Already registered
          <router-link :to="{ name: 'Login' }">sign in?</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
require("firebase/auth");
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async signUps() {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        // eslint-disable-next-line no-unused-vars
        .then((userCredential) => {
          alert("Successfully created account Login to chat!");
          this.$router.replace({ name: "Login" });
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
};
</script>