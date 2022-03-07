<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-center">
      <form class="w-50" @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email </label>
          <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          <div id="emailHelp" class="form-text">Votre email restera confidentiel.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Mot de passe</label>
          <input type="password" v-model="password" class="form-control" id="exampleInputPassword1">
        </div>
        <button type="submit" class="btn btn-primary">Envoyer</button>
      </form>
    </div>
  </div>
</template>

<script>
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import router from "@/router/NavRouter";

export default {
  name: "RegisterForm",
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    submitForm() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // Signed in
            // TODO creer une fonction qui ajoute directement document avec l'ID du compte crée et les champs nécessaires
            const user = userCredential.user;
            console.log(user.uid);
            router.push('/');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode + " : " + errorMessage)
          });
    }
  }
}
</script>

<style scoped>

</style>