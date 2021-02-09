<template>
    <div>
        <p v-if="loading">WAIT A SEC...</p>
        <div id="mapid" ref="mapContainer" @click="updateLocation"></div>
    </div>
</template>

<script>
    import 'leaflet/dist/leaflet.css'
    import L from 'leaflet'
    import Geo from 'geolocation'
    import ToggleButton from './ToggleButton'
    import FilterForm from './FilterForm'

    export default {
        name: 'Map.vue',     
        data () {
            return {
                longitude: 0,
                latitude: 0,
                loading: true,
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
</style>