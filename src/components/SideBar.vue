<template>
  <div class="col-sm-2">
    <div v-if="etat">
      <h1>Le jeu </h1>
      <questionnaire></questionnaire>
    </div>
    <div v-else>
      <h3>Veuillez sélectionner une région pour accéder au jeu</h3>
    </div>
  </div>
</template>

<script>
import Questionnaire from "@/components/Questionnaire";
export default {
  name: "SideBar",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Questionnaire
  },
  data() {
    return {
      etat: 'true' // TODO metter '' pour le départ
    }
  },
  methods() {
    var fromage = true; //TODO : envoyer une info quand l'user un sélection une région
    if (fromage) {
      this.etat = true;
    } else {
      this.etat = false;
    }
  }
}
</script>

<style scoped>

</style>
