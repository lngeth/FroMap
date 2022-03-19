<template>
  <div class="text-center mt-3">
    <div>
      <h1>Le jeu du fromage !</h1>
      <img src="@/assets/fromage_accueil.png" alt="image de fromage">
    </div>
    <div class="container">
      <div class="row justify-content-around">
        <div class="col-5 grow-animation">
          <div class="card-body">
            <h2 class="card-title">C'est quoi ?</h2>
            <p class="card-text">
              Fromage Passion est un jeu dans lequel vous devez trouver le type de lait utiliser dans la conception d'un fromage français !
              <span class="link" v-on:click="toggleEtape">
                <span v-if="etapeVisibility">Moins de détail</span>
                <span v-else>Plus de détail</span>
              </span>
            </p>
            <div id="carouselExampleIndicators" v-if="etapeVisibility" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <h3>Etape 1</h3>
                  <router-link to="/login" class="link">Connectez-vous</router-link> ou <router-link to="/register" class="link">créer votre compte</router-link> chez nous !
                </div>
                <div class="carousel-item">
                  <h3>Etape 2</h3>
                  <p><span class="fw-bold">Cliquer sur le département</span> français souhaiter</p>
                </div>
                <div class="carousel-item">
                  <h3>Etape 3</h3>
                  <p>
                    Sur la droite, jouez en répondant à la question en sélectionnant le type de fromage correspond
                    <br><span class="fst-italic">Bonne réponse : +10</span>
                    <br><span class="fst-italic">Mauvaise réponse : -5</span>
                  </p>
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
        <div class="col-5 grow-animation">
          <div class="card-body">
            <h2 class="card-title">Qui sommes-nous ?</h2>
            <div class="container">
              <div class="row justify-content-around">
                <div class="col-5">
                  <div class="fst-italic">Laurent <span class="text-uppercase">Ngeth</span></div>
                  <a href="https://www.linkedin.com/in/laurentngeth/" class="link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                    </svg>
                  </a>
                </div>
                <div class="col-5">
                  <div class="fst-italic">Thomas <span class="text-uppercase">Robert</span></div>
                  <a href="https://www.linkedin.com/in/thomas-robert1" class="link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data() {
    return {
      etapeVisibility: false,
    }
  },
  methods: {
    toggleEtape() {
      this.etapeVisibility = !this.etapeVisibility;
    }
  }
}
</script>

<style scoped>
.grow-animation {
  transition: width 0.5s;
}

.grow-animation:hover {
  border: 2px solid #FFBF69;
  border-radius: 10px;
  width: 50%;
  background-color: #FFBF69;
}

.link {
  text-decoration: none;
  color: #2EC4B6;
}

.link:hover {
  font-weight: bold;
  color: #2EC4B6;
}
</style>