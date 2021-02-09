<template>
    <div>
        <h1>Find Bin</h1>
        <ToggleButton id="searchFilterToggle" @buttonToggle="toggleFilterForm"/>
        <FilterForm id="searchFilterForm" v-if="showFilter"/>
        <Map />
    </div>
</template>

<script>
import Map from '../components/Map'
import ToggleButton from '../components/ToggleButton'
import FilterForm from '../components/FilterForm'

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
        }
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
    }
</style>