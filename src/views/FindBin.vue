<template>
    <div>
        <h1>Find Bin</h1>
        <ToggleButton id="searchFilterToggle" @buttonToggle="toggleFilterForm"/>
        <FilterForm :search="true" id="searchFilterForm" v-if="showFilter" @formSubmit="applyFilter"/>
        <Map :isClickable="false" />
    </div>
</template>

<script>
import Map from '../components/Map'
import ToggleButton from '../components/ToggleButton'
import FilterForm from '../components/FilterForm'
import bus from 'vue3-eventbus'

export default {
    components: {Map, ToggleButton, FilterForm},
    data () {
        return {
            showFilter: false,
            lat: 45.41117,
            long: -75.69812,
            rad: 1,
            bins: []
        }
    },
    methods: {
        toggleFilterForm() {
            this.showFilter = !this.showFilter
        },
        applyFilter(formObject) {
            this.rad = formObject.radius
            var adress = formObject.location.trim().replace(' ', '%20')
            fetch(`https://us1.locationiq.com/v1/search.php?key=pk.9dc4852939a1766bbd3827f072b48473&q=${adress}&format=json`)
            .then(res => {
                res.json().then(data => {
                    console.log(data[0].lat)
                    this.lat = data[0].lat
                    this.long = data[0].lon
                    this.fetchBins().then(response => {
                        response.json().then(data => {
                            this.bins = data
                            bus.emit('renderRequest', {lat: this.lat, long: this.long, bins: this.bins})
                        })
                    })
                })
            })
            this.toggleFilterForm()
        },
        fetchBins() {
            let link = `http://localhost:3000/public/bins?geo=${this.lat},${this.long}&rad=${this.rad}`
            return fetch(link, {
                method: 'GET',
                'Content-Type':'application/json'
            })
        }
    },
    mounted() {
        navigator.geolocation.getCurrentPosition(pos => {
            this.lat = pos.coords.latitude
            this.long = pos.coords.longitude
            this.fetchBins(1).then(response => {
                response.json().then(data => {
                    bus.emit('renderRequest', {lat: this.lat, long: this.long, bins: data})
                })
            })
        })
    }
}
</script>

<style scoped>
    #searchFilterToggle {
        margin: auto;
        margin-bottom: 10px;
        
    }
    #searchFilterForm {
        margin: auto;
        width: 60%;
        margin-bottom: 20px;
        margin-top: 20px;
    }
</style>