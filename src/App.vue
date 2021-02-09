<template>
  <Nav id="nav" />
  <router-view id="routContent"/>
</template>

<script>
import Nav from './components/Nav'

export default {
  components: {Nav}
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  width: 80%;
  margin: auto;
}
#routContent {
  margin-top: 40px;
}
</style>
