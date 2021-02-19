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
        }
    },
    methods: {
        toggleFilterForm() {
            this.showFilter = !this.showFilter
        },
        applyFilter(formObject) {
            var rad = formObject.radius
            if (formObject.location) {
                var adress = formObject.location.trim().replace(' ', '%20')
                fetch(`https://us1.locationiq.com/v1/search.php?key=pk.9dc4852939a1766bbd3827f072b48473&q=${adress}&format=json`)
                .then(res => {
                    res.json().then(data => {
                        console.log(data)
                        console.log(data[0].lat)
                        var lat = data[0].lat
                        var long = data[0].lon
                        bus.emit('renderRequest', {lat: lat, long: long, rad: rad})
                    })
                })
            } else {
                bus.emit('renderRequest', null, null, rad)
            }
            this.toggleFilterForm()
        },
    },
    mounted() {
        
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