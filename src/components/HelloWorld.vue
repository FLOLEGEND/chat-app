<template>
  <div class="main-div">
    <div class="view chat">
      <header>
        <button @click="Logout" class="logout">Logout</button>
        <h1>Welcome</h1>
      </header>

      <section class="chat-box">
        <div
          v-for="m in messages"
          :key="m.message"
          :class="m.author === username ? 'message current-user' : 'message'"
        >
          <div class="message-inner">
            <div class="content">{{ m.message }}</div>
            <div v-if="m.author !== username" class="username">
              {{ m.author }}
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div class="chat-div">
          <input
            class="chat-inputField"
            placeholder="Type a message"
            v-model="message"
          />
          <button @click="saveMessage" class="button">send</button>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
import { dbMenuRef } from "../main";
import firebase from "firebase";
require("firebase/auth");
export default {
  data() {
    return {
      message: null,
      messages: [],
      username: "",
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.username = user.email;
      } else {
        this.username = "Guest Account";
      }
    });
    this.fetchData();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          next();
        } else {
          vm.$router.replace({ name: "Login" });
        }
      });
    });
  },
  methods: {
    Logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: "Login" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    saveMessage() {
      dbMenuRef.add({
        message: this.message,
        author: this.username,
        createdAt: new Date(),
      });
      this.message = null;
    },
    fetchData() {
      dbMenuRef.orderBy("createdAt").onSnapshot((querySnapshot) => {
        let allMessages = [];
        querySnapshot.forEach((doc) => {
          allMessages.push(doc.data());
        });
        this.messages = allMessages;
      });
    },
  },
};
</script>


<style lang="scss">
.main-div {
  width: 40%;
  margin: auto;
}
.chat-div {
  display: flex;
}
.chat-inputField {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  width: 30rem;
  padding: 10px 15px;
  background-color: #030303;
  border-radius: 8px;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.button {
  width: 20%;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  width: 20%;
  padding: 10px 15px;
}
.view {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: #ea526f;

  &.login {
    align-items: center;
    .login-form {
      display: block;
      width: 100%;
      padding: 15px;
    }
  }
  &.chat {
    flex-direction: column;
    header {
      position: relative;
      display: block;
      width: 100%;
      padding: 50px 30px 10px;
      .logout {
        position: absolute;
        top: 15px;
        right: 15px;
        appearance: none;
        border: none;
        outline: none;
        background: none;

        color: #fff;
        font-size: 18px;
        margin-bottom: 10px;
        text-align: right;
      }
      h1 {
        color: #fff;
      }
    }
    .chat-box {
      border-radius: 24px 24px 0px 0px;
      background-color: #fff;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
      flex: 1 1 100%;
      padding: 30px;
      .message {
        display: flex;
        margin-bottom: 15px;

        .message-inner {
          .username {
            color: #888;
            font-size: 16px;
            margin-bottom: 5px;
            padding-left: 15px;
            padding-right: 15px;
          }
          .content {
            display: inline-block;
            padding: 10px 20px;
            background-color: #f3f3f3;
            border-radius: 999px;
            color: #333;
            font-size: 18px;
            line-height: 1.2em;
            text-align: left;
          }
        }
        &.current-user {
          margin-top: 30px;
          justify-content: flex-end;
          text-align: right;
          .message-inner {
            max-width: 75%;
            .content {
              color: #fff;
              font-weight: 600;
              background-color: #ea526f;
            }
          }
        }
      }
    }
  }
}
</style>