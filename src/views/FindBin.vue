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
import Geo from 'geolocation'
import bus from 'vue3-eventbus'

export default {
    components: {Map, ToggleButton, FilterForm},
    data () {
        return {
            showFilter: false,
            lat: 0,
            long: 0,
            bins: []
        }
    },
    methods: {
        toggleFilterForm() {
            this.showFilter = !this.showFilter
        },
        applyFilter(formObject) {
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
            //TEMPORARY FILLER WITH DUMMY SERVER
            return fetch('http://localhost:3000/bins', {
                method: 'GET',
                'Content-Type':'application/json'
            })
        }
    },
    mounted() {
        Geo.getCurrentPosition((err, position) => {
            if (!err) {
                this.lat = position.coords.latitude
                this.long = position.coords.longitude
            } else {
                console.log('Location Access Denied, showing Ottawa');
                this.lat = 45.41117
                this.long = -75.69812
            }
        })
        this.fetchBins().then(response => {
            response.json().then(data => {
                this.bins = data
                bus.emit('renderRequest', {lat: this.lat, long: this.long, bins: this.bins})
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