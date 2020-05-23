<template>
  <div class="row" :style="{ width: '100%' }">
    <div class="col-md-7">
      <img src="../../assets/images/FB.jpg" class="img-fluid" alt="Banner" />
    </div>
    <div class="col-md-5">
      <div class="Auth">
        <h1 id="logoApp">FOODIE</h1>
        <h2 :style="{ color: 'var(--secondaryText)' }">LOG IN</h2>
        <p v-if="error" :style="{color:'red'}">{{error}}</p>
        <form @submit.prevent="authenticate">
          <div class="Input">
            <input type="text" class="InputElement" placeholder="Email" v-model.lazy="email" />
            <input
              type="password"
              class="InputElement"
              placeholder="Password"
              v-model.lazy="password"
            />
            <input
              v-if="isSignUp"
              type="password"
              class="InputElement"
              placeholder="Confirm Password"
              v-model="cnfpassword"
            />
            <button
              class="btn btn-success"
              type="submit"
            >{{isSignUp ? loader?'Signing up...': 'Signup' : loader?'Signing in...' : ' Signin'}}</button>
          </div>
        </form>
        <hr />
        <button
          class="btn btn-primary"
          @click="changeMode"
          :disabled="loader"
          :style="[loader? {cursor:'no-drop'}:{cursor:'pointer'}]"
        >{{isSignUp ? 'Switch to Signin' : 'Switch to Signup'}}</button>
      </div>
      <br />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      cnfpassword: "",
      isSignUp: true,
      error: null
    };
  },
  computed: {
    loader() {
      return this.$store.getters.getLoaders;
    }
  },
  methods: {
    changeMode() {
      this.error = null;
      this.isSignUp = !this.isSignUp;
      console.log(this.isSignUp);
    },
    authenticate() {
      this.error = null;
      this.$store.commit("setLoader", true);
      const loginData = {
        email: this.email,
        password: this.password,
        returnSecureToken: true
      };
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBlMoiTr7TXkCCtEd3wNNDpSp5RX76jGzw";
      if (this.isSignUp) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBlMoiTr7TXkCCtEd3wNNDpSp5RX76jGzw";
      }
      this.$http.post(url, loginData).then(
        response => {
          console.log(response);
          const authData = {
            email: response.body.email,
            localId: response.body.localId,
            idToken: response.body.idToken
          };
          this.$store.commit("setLoader", false);
          this.$store.commit("setAuthData", authData);
          if (this.$store.getters.getTempOrders.length > 0) {
            this.$router.push("/checkout");
          } else {
            this.$router.push("/");
          }
        },
        err => {
          this.$store.commit("setLoader", false);
          this.error = err.body.error.message;
        }
      );
    }
  },
  created() {
    const authData = {
      email: null,
      localId: null,
      idToken: null
    };
    this.$store.commit("setAuthData", authData);
  }
};
</script>
<style >
.Auth {
  margin: 20px auto;
  width: 80%;
  text-align: center;
  box-shadow: 0 2px 3px #ccc;
  border: 1px solid #eee;
  padding: 10px;
  box-sizing: border-box;
}

.Input {
  display: block;
}

@media (min-width: 600px) {
  .Auth {
    width: 450px;
  }
}
.InputElement {
  outline: none;
  border: 1px solid #ccc;
  background-color: white;
  font: inherit;
  padding: 6px 10px;
  margin-bottom: 15px;
  display: block;
  width: 100%;
  box-sizing: border-box;
}

.InputElement:focus {
  outline: none;
  background-color: #ccc;
}
</style>