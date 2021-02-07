<template>
  <div id="nav">
    <router-link :to="{name: 'FindBin'}">Find Bin</router-link>
    <router-link :to="{name: 'AddLocation'}">Add Bin</router-link>
    <router-link :to="{name: 'AboutUs'}">About Us</router-link>
  </div>
  <router-view/>
</template>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  position: relative;
}

#nav a {
  width: 90px;
  display: inline-block;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin-right: 30px;
  padding: 8px;
  border-radius: 5px;
}

#nav a.router-link-exact-active {
  color: whitesmoke;
  background-color: #42b983;
}
</style>
