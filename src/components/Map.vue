<template>
    <p v-if="loading">WAIT A SEC...</p>
    <form @submit.prevent v-if="!loading">
        <label for="location">Location:</label><br>
        <input id="location" type="text"><br>

        <label for="radius">Radius:</label><br>
        <input type="range" id="radius" min="1" max="400" step="1" b-model="searchRadius">
        <output class="range-out" for="range"></output>

    </form>
    <div id="mapid" ref="mapContainer" @click="updateLocation"></div>
</template>

<script>
    import 'leaflet/dist/leaflet.css'
    import L from 'leaflet'
    import Geo from 'geolocation'

    export default {
        name: 'Map.vue',
        data () {
            return {
                longitude: 0,
                latitude: 0,
                loading: true,
                searchRadius: 1,
                tmpRad: 1,
                wasteType: [],
            }
        },
        methods: {
            renderMap() {
                this.loading = true
                Geo.getCurrentPosition((err, position) => {
                    var map = null
                    if (!err) {
                        this.longitude = position.coords.longitude
                        this.latitude = position.coords.latitude
                        map = L.map(this.$refs.mapContainer, {preferCanvas: true}).setView([this.latitude, this.longitude], 13)
                    } else {
                        console.log('Location Access Denied, showing Ottawa');
                        map = L.map(this.$refs.mapContainer, {preferCanvas: true}).setView([45.41117, -75.69812], 13)
                    }
                    const layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
                        .addTo(map)
                    this.loading = false
                })
            },
            updateLocation() {
                this.latitude = 0
            },
            validateRad(e) {
                if ((48 <= e.keyCode && e.keyCode <= 57) || e.keyCode == 8) {
                    this.searchRadius = this.tmpRad
                } else {
                    this.tmpRad = this.searchRadius
                }
                console.log(this.searchRadius)
            },
        },
        computed: {
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
    form > * {
        margin: 10px;
    }
    #radius {
        width: 50px;
        margin-left: 20px;
    }
</style>