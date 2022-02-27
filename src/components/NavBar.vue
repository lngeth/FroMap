<script>

export default {
  name: 'MenuBar'
}
</script>

<template>
  <nav>
    <router-link to="/">Accueil</router-link>
    <router-link to="/about">A propos</router-link>
    <router-link :to="{name: 'Product', params : {name: 'Skate'}}">Produit 1</router-link>
    <router-view />
  </nav>
</template>