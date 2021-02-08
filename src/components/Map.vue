<template>
    <p v-if="loading">WAIT A SEC...</p>
    <div class="filterForm">
        <ToggleButton />
        <form @submit.prevent v-if="!loading" id="filterForm">
        <label for="location">Location:</label><br>
        <input id="location" type="text"><br>

        <label for="rad">Radius</label><br>
        <input type="range" id="rad" min="1" max="100" v-model="searchRadius"><br>
        <label for="rad">{{ searchRadius }} km</label><br>
        <label for="rad">Garbage Type:</label><br>

        </form>
    </div>
    <div id="mapid" ref="mapContainer" @click="updateLocation"></div>
</template>

<script>
    import 'leaflet/dist/leaflet.css'
    import L from 'leaflet'
    import Geo from 'geolocation'
    import ToggleButton from './ToggleButton'

    export default {
        name: 'Map.vue',
        components: [ToggleButton],       
        data () {
            return {
                longitude: 0,
                latitude: 0,
                loading: true,
                searchRadius: 1,
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
    .filterForm {
        border: 1px solid#2c3e50;
        width: 400px;
        margin: auto;
        border-radius: 10px;
        margin-bottom: 20px;
        padding: 10px;
    }
    .filterToggle {
        position: relative;
        margin: auto; 
    }
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