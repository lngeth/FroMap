<script>
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";

export default {
  name: 'MenuBar',
  data() {
    return {
      isConnected : true
    }
  },
  methods: {
    signOut() {
      const auth = getAuth()
      signOut(auth).then(() => {
        this.$router.push({name: 'Home'})
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user)
        this.isConnected = true
      else
        this.isConnected = false
    })
  }
}
</script>

<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        <img src="../assets/vivino_icon.png" alt="Image vivino" width="30" height="30" class="d-inline-block align-text-top">
        Accueil
      </router-link>
      <router-link to="/leaflet">Map</router-link>
      <div v-if="isConnected">
        <a @click="signOut">Déconnection</a>
      </div>
      <div v-else>
        <router-link to="/login">Se connecter</router-link>
      </div>
    </div>
  </nav>
</template>