<template>
  <div class="container mt-5">
    <form class="w-50" @submit.prevent="submitForm">
      <div class="mb-3">
        <p>Quel lait a été utilisé pour fabriquer {{ fromage }} ?</p>
      </div>
      <div class="mb-3">
        <label for="optionsLait" class="form-label">Type de lait</label>
        <select id="optionsLait" v-model="selected">
          <option value="Vache" selected>Vache</option>
          <option value="chevre">Chèvre</option>
          <option value="brebie">Brebie</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Valider</button>
    </form>
  </div>
</template>

<script>

export default {
  name: "Questionnaire",
  data() {
    return {
      typeLait: ["Vache", "Chèvre", "Brebie"],
      selected: '',
      fromage: ''
    }
  },
  methods: {
    submitForm() {
      //TODO vérifier le choix dans la bdd ou script dans leaflet
    }
  }
}
</script>

<style scoped>

</style>
