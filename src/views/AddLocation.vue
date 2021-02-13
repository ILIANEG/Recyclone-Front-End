<template>
<div>
  <h1>Add Location</h1>
  <AddForm class="addForm" @submit="submitForm" />
  <Map :isClickable="true" @markerManipulation="updateMarker" />
</div>
</template>

<script>
import Map from '../components/Map'
import AddForm from '../components/AddForm'
import Geo from 'geolocation'
import bus from 'vue3-eventbus'

export default {
  components: {Map, AddForm},
  data() {
    return {
            showFilter: false,
            lat: 45.41117,
            long: -75.69812,
            bins: [],
            selectionMarker: null,
        }
  },
  methods: {
    fetchBins() {
      //TEMPORARY FILLER WITH DUMMY SERVER
      let link = `http://localhost:3000/public/bins?geo=${this.lat},${this.long}&rad=2`
      return fetch(link, {
        method: 'GET',
        'Content-Type':'application/json'
      })
    },
    // Validation to be implemented
    submitForm(formObject) {
      comsole.log({formObject})
    },
    updateMarker(e) {
      this.selectionMarker = e
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

<style>
  .addForm {
    margin: auto;
    margin-bottom: 10px
  }
</style>