<template>
    <div class="error">
        <p>
            Error: Please make sure that at least one
            waste type is selected, and Location pin is dropped on the map
        </p>
    </div>
    
</template>

<script>
export default {

}
</script>

<style scoped>
    .error {
        width: 50%;
        margin: auto;
        background-color: rgb(255, 130, 130);
        opacity: 80%;
        border-radius: 20px;
        color: black;
        padding: 5px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
    }
</style>