<template>
  <div class="col-sm-4">
    <div v-if="etat">
      <h1 class="text-center">Le jeu - {{ departement }}</h1>
      <questionnaire :obj-fromage="this.fromage" :score-user="this.score" @score="updateScore"></questionnaire>
    </div>
    <div v-else>
      <h3>Veuillez sélectionner une région pour accéder au jeu</h3>
    </div>
    <p>Score : <span v-if="score < 0" class="text-danger fw-bold">{{ this.score }}</span><span v-else class="text-success fw-bold">{{ this.score }}</span></p>
  </div>
</template>

<script>
import Questionnaire from "@/components/Questionnaire";
import {getDocumentByIDFromDatabase, setDocumentByIDFromDatabase} from "@/firebase-function";
import {getAuth} from "firebase/auth";
export default {
  name: "SideBar",
  props: [
      'fromage',
  ],
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Questionnaire
  },
  data() {
    return {
      departement:'',
      etat: '',
      score: '',
    }
  },
  watch: {
    fromage() {
      if (this.fromage !== null) {
        this.departement = this.fromage.departement;
        this.etat = true;
      }
    }
  },
  async mounted() {
    console.log(getAuth().currentUser.uid)
    const docSnap = await getDocumentByIDFromDatabase("users", getAuth().currentUser.uid);
    if (docSnap.exists()) {
      this.score = docSnap.data()["score"];
    } else {
      console.log("no such doc");
    }
  },
  methods: {
    updateScore(e) {
      if (e) {
        this.score += 10;
      } else {
        this.score -= 5;
      }
      setDocumentByIDFromDatabase("users", getAuth().currentUser.uid, {score: this.score});
    }
  }
}
</script>

<style scoped>

</style>
