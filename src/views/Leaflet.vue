<template>
  <div class="row">
    <div class="col-sm-10">
      <div id="map"></div>
    </div>
    <SideBar />
  </div>
</template>

<script>

import * as L from "leaflet";
import {getAuth} from "firebase/auth";
import router from "@/router/NavRouter";
import {getDocumentByIDFromDatabase, setDocumentByIDFromDatabase} from "@/firebase-function";
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
      layerArrondissements: [], // layer des arrondissements
      arrondissements: [], // arrondissements
    }
  },
  mounted() {
    const user = getAuth().currentUser;
    if (user) {
      this.initMap();
      this.initData();
    } else {
      router.push({name: 'Login', params: {connectionNeeded: 'Vous devez être connecter pour accéder à ce service.'}});
    }
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView([48.843234, 2.269594], 13);
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: process.env.VUE_APP_ACCESS_TOKEN_LEAFLET
      }).addTo(this.map);
      this.map.on('click', this.onMapClick);
      this.layerMarkers = L.layerGroup().addTo(this.map);
      this.layerArrondissements = L.layerGroup().addTo(this.map)
      this.drawTownship(75101);
    },
    onMapClick(e) {
      let addMarker = L.DomUtil.create('button');
      addMarker.textContent = "ajouter un marker";
      addMarker.addEventListener("click", ()=> {
        console.log("ajout du marker");
        this.drawMarker(e.latlng.lat, e.latlng.lng);
      })
      L.popup()
          .setLatLng(e.latlng)
          .setContent(addMarker)
          .openOn(this.map);
    },
    async initData() {
      const docSnap = await getDocumentByIDFromDatabase("users", getAuth().currentUser.uid);
      if (docSnap.exists()) {
        //console.log(docSnap.data());
        // markers => docSnap.data()["markers"]
        docSnap.data()["markers"].forEach(marker => {
          this.markers.push(marker.split(',').map(str => {
            return Number(str);
          }));
        })
        this.drawAllMarkers();
      } else {
        console.log("no such doc");
      }
    },
    drawMarker(lat, long){
      this.markers.push([lat, long]);
      //L.marker.bindPopup("test de nom");
      L.marker([lat, long]).addTo(this.layerMarkers);
    },
    drawAllMarkers() {
      this.layerMarkers.clearLayers();
      this.markers.forEach(marker => {
        L.marker([marker[0], marker[1]]).addTo(this.layerMarkers);
      })
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
    drawTownship(code) { //TODO : appel avec un parametre
      axios
        .get('https://geo.api.gouv.fr/communes/' + code + '/?&fields=contour')
        .then(rep => {
          let contour = rep.data.contour;
          let nameTown = rep.data.nom;
          let codeTown = rep.data.code;
          let coordinates = JSON.parse(JSON.stringify(contour.coordinates))
          let newCoordinates = []
          coordinates[0].forEach(coord => {
            newCoordinates.push(coord.reverse())
          })
          let polygone = L.polygon(newCoordinates, this.styleTownship())
          polygone.on('mouseover', () => {
            console.log(nameTown)
          })
          polygone.bindTooltip(nameTown,
              {permanent: false, direction:"center"}
          ).openTooltip()
          this.arrondissements.push({
            name: nameTown,
            code: codeTown,
            polygone: polygone,
          });
          polygone.addTo(this.layerArrondissements)
        })
    },
    updateMarkersBDD() {
      const objectToSet = {
        markers: this.markers
      }
      setDocumentByIDFromDatabase("users", getAuth().currentUser.uid, objectToSet);
    }
  }
}
</script>

<style>
#map {
  height: 94vh;
}
</style>