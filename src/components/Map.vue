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
    props: 
    {
        isClickable: Boolean,
    },
    name: 'Map.vue',     
    data () {
        return {
            map: null,
            clickable: this.isClickable,
            loading: true,
        }
    },
    methods: {
        renderMap(lat, long, bins) {
            this.loading = true
            const layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
                .addTo(this.map)

                L.marker([lat, long], {icon: blueIcon}).addTo(this.map).bindPopup('You')
                    this.map.on('click', e => {
                    if(this.clickable) {
                        var marker = L.marker(e.latlng, {icon: yellowIcon, draggable: true}).addTo(this.map)
                        this.markerLocation = marker.getLatLng()
                        marker.on('drag', e => {
                            this.markerLocation = marker.getLatLng()
                        })
                        this.clickable = false;
                    }
                })
                for (let i = 0; i < bins.length; i++) {
                    L.marker([bins[i].lat, bins[i].long], {icon: greenIcon}).addTo(this.map)
                }
                this.loading = false
        },
    },
    mounted() {
        this.map = L.map(this.$refs.mapContainer, {preferCanvas: true})
        bus.on('renderRequest', e => {
            this.map.setView([e.lat, e.long], 13)
            this.renderMap(e.lat, e.long, e.bins)
        })
    },
    beforeUnmount () {
        //delete map
    }
}

</script>

<style scoped>
    #mapid{
        height: 600px;
        width: 70%;
        margin: auto;
    }
</style>