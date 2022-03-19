<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <p>Quel lait a été utilisé pour fabriquer {{ fromage }} ?</p>
      </div>
      <div class="mb-3 mt-5 d-flex justify-content-around">
        <p @click="clickTypeLait('Vache')" v-bind:class="{'selected':typeLait==='Vache'}">Vache</p>
        <p @click="clickTypeLait('Chèvre')" v-bind:class="{'selected':typeLait==='Chèvre'}">Chèvre</p>
        <p @click="clickTypeLait('Brebie')" v-bind:class="{'selected':typeLait==='Brebie'}">Brebie</p>
      </div>
      <div class="text-end pe-5">
        <button type="submit" class="btn" style="background-color: #2EC4B6; color: #FFFFFF">Valider</button>
      </div>
    </form>
  </div>
  <div v-if="result" class="mt-lg-4 d-flex justify-content-center">
    <div class="alert alert-success text-center">
      Bonne réponse !
    </div>
  </div>
  <div v-else class="mt-lg-4 d-flex justify-content-center">
    <div class="alert alert-warning text-center">
      Perdu, vous pouvez rejouer!
    </div>
  </div>
</template>

<script>

export default {
  name: `Questionnaire`,
  props: [
    'objFromage',
      'scoreUser'
  ],
  data() {
    return {
      typeLaits: ["Vache", "Chèvre", "Brebie"],
      typeLait: '',
      typeLaitFrom: '',
      fromage: '',
      result: '',
    }
  },
  watch: {
    objFromage() {
      if (this.objFromage !== null) {
        this.fromage = this.objFromage.fromage;
        this.typeLaitFrom = this.objFromage.lait;
      }
    },
  },
  methods: {
    clickTypeLait(e) {
      this.typeLait = e;
    },
    selected(e) {
      e.setStyle({
        border: "1px solid black",
      })
    },
    submitForm() {
      this.result = this.typeLaitFrom === this.typeLait;
      this.$emit('score', this.result)
    }
  }
}
</script>

<style scoped>
.selected {
  border: 2px solid #FF9F1C;
  background-color: #FF9F1C;
  border-radius: 10px;
  padding: 5px;
  color: #FFFFFF;
}
</style>
