<template>
<div>
  <h1>Add Location</h1>
  <AddForm />
  <Map :isClickable="true" />
</div>
</template>

<script>
import Map from '../components/Map'
import AddForm from '../components/AddForm'

export default {
  components: {Map, AddForm}
}
</script>

<style>

</style>