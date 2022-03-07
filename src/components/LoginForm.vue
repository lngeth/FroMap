<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-center">
      <form class="w-50" @submit.prevent="submitForm">
        <div class="mb-3">
          <div v-if="error !== ''" class="text-danger fst-italic">{{error}}</div>
          <label for="exampleInputEmail1" class="form-label">Email </label>
          <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          <div id="emailHelp" class="form-text">Votre email restera confidentiel.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Mot de passe</label>
          <input type="password" v-model="password" class="form-control" id="exampleInputPassword1">
        </div>
        <div class="d-flex justify-content-between">
          <div>
            <span class="text-secondary fst-italic">Pas encore inscrit ? </span>
            <router-link to="/register">S'inscrire</router-link>
          </div>
          <button type="submit" class="btn btn-primary">Envoyer</button>
        </div>
      </form>
    </div>
    <div class="d-flex justify-content-center">
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    }
  },
  methods: {
    submitForm() {
      //console.log(this.email + " : " + this.password)
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            console.log(user.uid);
            this.$router.push({name: 'Home'});
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("test " + errorCode + " : " + errorMessage)
            this.error = "Login ou mot de passe erroné !";
          });
    }
  }
}
</script>