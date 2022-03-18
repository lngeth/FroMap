<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <p>Quel lait a été utilisé pour fabriquer {{ fromage }} ?</p>
      </div>
      <div class="mb-3">
        <label for="optionsLait" class="form-label">Type de lait</label>
        <select id="optionsLait">
          <option value="Vache" selected>Vache</option>
          <option value="chevre">Chèvre</option>
          <option value="brebie">Brebie</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Valider</button>
    </form>
  </div>
  <div v-if="result" class="mt-lg-4">
    <div class="alert alert-success">
      Bonne réponse !
    </div>
  </div>
  <div v-else class="mt-lg-4">
    <div class="alert alert-warning">
      Perdu, vous pouvez rejouer!
    </div>
  </div>
</template>

<script>

export default {
  name: `Questionnaire`,
  data() {
    return {
      typeLait: ["Vache", "Chèvre", "Brebie"],
      selected: '',
      fromage: '',
      result: '',
      styleResult:''
    }
  },
  methods: {
    submitForm() {
      //TODO vérifie r le choix dans la bdd ou script dans leaflet
      var res = true
      this.result = res;
    }
  }
}
</script>

<style scoped>

</style>
