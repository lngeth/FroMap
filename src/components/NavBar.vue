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
  <nav class="navbar">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand fw-bold" id="router-link">
        Accueil
      </router-link>
      <router-link class="nav-link fw-bold" id="router-link" to="/leaflet">Map</router-link>
      <div v-if="isConnected">
        <a @click="signOut" class="fw-bold text-decoration-none" id="router-link">Déconnection</a>
      </div>
      <div v-else>
        <router-link id="router-link" to="/login">Se connecter</router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav.navbar, router-link {
  background-color: #FFFFFF;
  color: #FF9F1C;
}

#router-link {
  color: #FF9F1C;
}
</style>