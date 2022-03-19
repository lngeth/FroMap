<template>
  <div class="row">
    <div class="col-sm-8">
      <div id="map"></div>
    </div>
    <SideBar :fromage="clickedDep" />
  </div>
</template>

<script>

import * as L from "leaflet";
import {getAuth} from "firebase/auth";
import router from "@/router/NavRouter";
import SideBar from "@/components/SideBar";
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Leaflet',
  components: {
    SideBar,
  },
  data() {
    return {
      map: '', // map
      popup: '', //
      layerMarkers: '', // layer des markers
      markers: [], // tableau de markers
      circles: [], // zone selection
      objFromage: [],
      clickedDep: null,
      layerArrondissements: [], // layer des arrondissements
      arrondissements: [], // arrondissements
    }
  },
  mounted() {
    const user = getAuth().currentUser;
    if (user) {
      this.initMap();
    } else {
      router.push({name: 'Login', params: {connectionNeeded: 'Vous devez être connecter pour accéder à ce service.'}});
    }
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView([48.843234, 2.269594], 6);
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: process.env.VUE_APP_ACCESS_TOKEN_LEAFLET
      }).addTo(this.map);
      this.layerMarkers = L.layerGroup().addTo(this.map);
      this.layerArrondissements = L.layerGroup().addTo(this.map)
      this.initObjFromage();
      this.getLocation();
    },
    drawMarker(lat, long){
      this.markers.push([lat, long]);
      //L.marker.bindPopup("test de nom");
      L.marker([lat, long]).addTo(this.layerMarkers);
      this.map.addLayer(this.layerMarkers);
    },
    styleTownship() {
      return {
        fillColor: 'rgb(0,176,80)',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
      }
    },
    async initObjFromage() {
      axios
          .get('https://public.opendatasoft.com/api/records/1.0/search/?dataset=fromagescsv-fromagescsv&q=&facet=departement&facet=fromage&facet=lait')
          .then(rep => {
            let data = rep.data;
            let tabDepartement = data.records;
            tabDepartement.forEach(dep => {
              let fields = dep.fields;
              this.objFromage.push({
                departement: fields.departement,
                fromage: fields.fromage,
                lait: fields.lait
              })
            });
            this.getDep();
          })
    },
    getDep() {
      axios
          .get('https://geo.api.gouv.fr/departements')
          .then(rep => {
            // eslint-disable-next-line no-unused-vars
            let tabFro = JSON.parse(JSON.stringify(this.objFromage));
            rep.data.forEach(dep => {
              let depNom = dep.nom;
              //console.log(depNom)
              for (let fro of tabFro) {
                if (fro.departement === depNom) {
                  this.drawDep(dep.code + '-' + depNom.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/'/g, "-"), depNom);
                  break;
                }
              }
            })
          });
    },
    drawDep(code, depNom) {
      // 'https://france-geojson.gregoiredavid.fr/repo/departements/'+ code + '/departement-'+ code +'.geojson'
    axios
        .get('https://france-geojson.gregoiredavid.fr/repo/departements/'+ code + '/departement-'+ code +'.geojson')
        .then(rep => {
          //console.log(code)
          let coordinates = rep.data.geometry.coordinates;
          //console.log(coordinates);
          let newCoordinates = []
          coordinates.forEach(coord => {
            let tabCoord = []
            coord.forEach(c => {
              tabCoord.push(c.reverse());
            })
            newCoordinates.push(tabCoord)
          })

          let polygone = L.polygon(newCoordinates, this.styleTownship());
          polygone.on("mouseover", ()=> {
            polygone.setStyle({
              fillColor: 'rgb(255,255,0)'
            })
          })
          polygone.on("mouseout", ()=> {
            polygone.setStyle({
              fillColor: 'rgb(0,176,80)'
            })
          })
          polygone.on("click", () => {
            this.objFromage.filter(fro => {
              if (fro.departement === depNom) {
                this.clickedDep = fro;
                console.log(this.clickedDep)
              }
            })
          })
          polygone.bindTooltip(depNom,
              {permanent: true, direction:"center"}
          ).openTooltip()
          //console.log(polygone)
          polygone.addTo(this.layerArrondissements)
        })
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },
    showPosition(pos) {
      this.drawMarker(pos.coords.latitude, pos.coords.longitude)
    }
  }
}
</script>

<style>
#map {
  height: 94vh;
}
</style>
