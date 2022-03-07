<template>
  <div id="map"></div>
</template>

<script>

import * as L from "leaflet";
import {getAuth} from "firebase/auth";
import router from "@/router/NavRouter";
import {getDocumentByIDFromDatabase} from "@/firebase-function";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Leaflet',
  data() {
    return {
      map: '',
      popup: '',
      layerMarkers: '',
      markers: [],
      circles: [],
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
  watch: {
    markers: {
      handler(newTab, oldTab) {
        console.log("watcher");
        if (newTab !== oldTab) {
          console.log("mise a jour")
          this.drawMarkers();
        }
      },
      deep: true
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
      this.drawTownship();
    },
    onMapClick(e) {
      let addMarker = L.DomUtil.create('button');
      addMarker.textContent = "ajouter un marker";
      addMarker.addEventListener("click", ()=> {
        console.log("ajout du marker");
        console.log(e.latlng);
        this.markers.push([e.latlng.lat, e.latlng.lng]);
        console.log(this.markers);
        this.drawMarkers();
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
        this.drawMarkers();
      } else {
        console.log("no such doc");
      }
    },
    drawMarkers() {
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
    getTownship(url, callback) {
      var req = new XMLHttpRequest();
      req.open("GET", url);
      req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
          callback(req.responseText);
        } else {
          console.error(req.status + " " + req.statusText + " " + url);
        }
      });
      req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
      });
      req.send(null); // TODO : 404
    },
    drawTownship() { //TODO : appel avec un parametre
      let url = "https://geo.api.gouv.fr/communes/75101/?&fields=contour"
      this.getTownship(url, function (rep) {
        let contour = JSON.parse(rep).contour;
        let nameTown = JSON.parse(rep).nom;
        let codeTown = JSON.parse(rep).code;

        L.geoJSON(nameTown).addTo(this.map)
        L.geoJSON(contour).addTo(this.map);
        L.geoJSON(contour, {style: this.styleTownship}).addTo(this.map);

      })
    }
  }
}
</script>

<style>
#map {
  height: 94vh;
}
</style>