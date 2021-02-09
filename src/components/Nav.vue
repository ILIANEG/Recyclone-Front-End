<template>
    <div>
        <p class="navTitl">Recyclone</p>
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
    #nav {
        postion: fixed
    }
    .navTitl {
        display: inline-block;
        float: left;
        padding: 5px;
        margin: 5px;
    }
    .elems {
        display: inline-block;
        float: right
    }
    .navElem {
        display: inline-block;
        margin: 10px 25px;
        text-decoration: none;
        color: #2c3e50;
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