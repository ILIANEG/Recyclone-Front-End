<template>
<div>
  <h1>Add Location</h1>
  <Error v-if="this.error" @click="error=false" />
  <AddForm class="addForm" @formSubmit="submitForm" @formValidationError="error = true"/>
  <Map :isClickable="true" @markerManipulation="updateMarker" />
</div>
</template>

<script>
import Map from '../components/Map'
import AddForm from '../components/AddForm'
import bus from 'vue3-eventbus'
import Error from '../components/Error.vue'

export default {
  components: {Map, AddForm, Error},
  data() {
    return {
            showFilter: false,
            lat: 45.41117,
            long: -75.69812,
            bins: [],
            selectionMarker: null,
            error: false
        }
  },
  methods: {
    fetchBins() {
      let link = `http://localhost:3000/public/bins?lat=${this.lat}&long=${this.long}&rad=5`
      return fetch(link, {
        method: 'GET',
        'Content-Type':'application/json'
      })
    },
    sendBin(binObject) {
      console.log(binObject)
      let link = 'http://localhost:3000/public/bins'
      return fetch(link, {
        method: 'POST',
        body: JSON.stringify(binObject),
        headers: {'Content-Type': 'application/json'}
      })
    },
    submitForm(formObject) {
      if(this.formValidation(formObject)) {
        formObject.color.forEach((value, key) => {
          let binObject = 
            {
              longitude: this.selectionMarker.lng,
              latitude: this.selectionMarker.lat,
              type: key,
              color: value,
            }
          this.sendBin(binObject).then(console.log('success'))
        })
      } else {
        this.error = true
      }
    },
    updateMarker(e) {
      this.selectionMarker = e
    },
    formValidation(formObject) {
      if (0 < formObject.rad && formObject.rad < 200 && this.selectionMarker) {
        for (let i = 0; i < formObject.waste.length; i++) {
          if(!formObject.color.has(formObject.waste[i])) {
            return false
          }
        }
        return true
      } else {
        return false
      }
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