<template>
    <div class="body">
        <p class="navTitl">RECYCLONE</p>
        <div class="elems">
            <router-link class="navElem" :to="{name: 'FindBin'}">Find Bin</router-link>
            <router-link class="navElem" :to="{name: 'AddLocation'}">Add Bin</router-link>
            <router-link class="navElem" :to="{name: 'AboutUs'}">About Us</router-link>
        </div>
        <div class="clr"></div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .body {
        background: #2c3e50;
        color: whitesmoke
    }
    .navTitl {
        display: inline-block;
        float: left;
        padding: 5px;
        margin: 5px;
        margin-left: 5%;
        font-weight: bold;
        letter-spacing: 2px;
    }
    .elems {
        display: inline-block;
        float: right;
        margin-right: 5%;
    }
    .navElem {
        display: inline-block;
        margin: 10px 25px;
        color: whitesmoke;
        text-decoration: none;
        font-weight: bold
    }
    .router-link-exact-active {
        text-decoration: underline #42b983;
        font-weight: bolder;
    }
    .clr {
        clear: both;
    }
</style>