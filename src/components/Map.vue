<template>
    <div>
        <p v-if="loading">WAIT A SEC...</p>
        <div id="mapid" ref="mapContainer" @click="setMarker"></div>
    </div>
</template>

<script>

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Geo from 'geolocation'
import bus from 'vue3-eventbus'

var blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var yellowIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export default {
    name: 'Map.vue',     
    data () {
        return {
            map: null,
            clickable: this.clickable,
            loading: true,
            position: {lat: 0, long: 0},
            bins: [],
            rad: 1,
            clickable: Boolean,
        }
    },
    methods: {
        async renderMap(lat, long, rad) {
            this.position = {lat: lat, long: long}
            this.rad = rad
            console.log('here')
            const data = await this.fetchBins()
            console.log('here')
            console.log(data)
            this.map.setView([this.position.lat, this.position.long], 13)
            const layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
                .addTo(this.map)
                L.marker([this.position.lat, this.position.long], {icon: blueIcon}).addTo(this.map).bindPopup('You')
                    this.map.on('click', e => {
                    if(this.clickable) {
                        var marker = L.marker(e.latlng, {icon: yellowIcon, draggable: true}).addTo(this.map)
                        this.$emit('markerManipulation', marker.getLatLng())
                        marker.on('drag', e => {
                            this.$emit('markerManipulation', marker.getLatLng())
                        })
                        this.clickable = false;
                    }
                })
                for (let i = 0; i < bins.length; i++) {
                    console.log(bins)
                    L.marker([bins[i].lat, bins[i].long], {icon: greenIcon}).addTo(this.map)
                }
                this.loading = false
        },
        fetchBins() {
            return new Promise((resolve, reject) => {
                let link = `http://localhost:3000/public/bins?lat=${this.lat}&long=${this.long}&rad=${this.rad}`
                return fetch(link, {
                method: 'GET',
                'Content-Type':'application/json'
                }).then(res => {
                    if(400 <= res.status) {
                        reject([])
                    } else {
                        return res.json()
                    }
                }).then(data => {
                    resolve(data)
                })
            })
        }
    },
    // Hook triggered on mounting of element, it is initial map rendering
    mounted() {
        navigator.geolocation.getCurrentPosition(pos => {
            this.position = {lat: pos.coords.latitude, long: pos.coords.longitude}
            this.map = L.map('mapid').setView([this.position.lat, this.position.long], 13);
            this.renderMap(this.position.lat, this.position.long, this.radius)
        })
    },
}

</script>

<style scoped>
    #mapid{
        height: 600px;
        width: 70%;
        margin: auto;
    }
</style>