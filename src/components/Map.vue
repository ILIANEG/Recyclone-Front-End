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

    export default {
        props: {isClickable: Boolean},
        name: 'Map.vue',     
        data () {
            return {
                longitude: 0,
                latitude: 0,
                loading: true,
                map: null,
                clickable: this.isClickable,
                markerLocation: []
            }
        },
        methods: {
            renderMap() {
                this.loading = true
                Geo.getCurrentPosition((err, position) => {
                    if (!err) {
                        this.longitude = position.coords.longitude
                        this.latitude = position.coords.latitude
                        this.map = L.map(this.$refs.mapContainer, {preferCanvas: true}).setView([this.latitude, this.longitude], 13)
                    } else {
                        console.log('Location Access Denied, showing Ottawa');
                        this.map = L.map(this.$refs.mapContainer, {preferCanvas: true}).setView([45.41117, -75.69812], 13)
                    }
                    const layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
                        .addTo(this.map)
                    var blueIcon = new L.Icon({
                        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41]
                    });
                    L.marker([this.latitude, this.longitude], {icon: blueIcon}).addTo(this.map).bindPopup('You')
                    this.fetchBins()
                    if(this.clickable) {
                        var yellowIcon = new L.Icon({
                            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });
                        this.map.on('click', e => {
                            console.log(this.markerLocation)
                            if(this.clickable) {
                                var marker = L.marker(e.latlng, {icon: yellowIcon, draggable: true}).addTo(this.map)
                                this.markerLocation = marker.getLatLng()
                                marker.on('drag', e => {
                                    this.markerLocation = marker.getLatLng()
                                })
                                this.clickable = false;
                            }
                        })
                    }
                    this.loading = false
                })
            },
            fetchBins() {
                var greenIcon = new L.Icon({
                        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41]
                });
                 L.marker([this.latitude-3, this.longitude], {icon: greenIcon}).addTo(this.map).bindPopup('Bin Info')
                 L.marker([this.latitude-2, this.longitude], {icon: greenIcon}).addTo(this.map).bindPopup('Bin Info')
            },
        },
        mounted () {
            this.renderMap()
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