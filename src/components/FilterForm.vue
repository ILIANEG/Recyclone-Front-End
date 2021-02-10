<template>
    <div>
        <form @submit.prevent="filterApplied" id="filterApplied">
        <div class="locAndRad">
            <div class="section">
                <label for="rad">Radius:</label><br>
                <input type="range" id="rad" min="1" max="100" v-model="searchRadius"><br>
                <label for="rad">{{ searchRadius }} km</label><br>
            </div>
            <div class="section">
                <label for="location">Location:</label><br>
                <input id="location" type="text" v-model="location"><br>
            </div>
        </div>
        <div class="garbageTypeSelector">
            <p>Waste Type:</p>
            <input type="checkbox" name="paper" id="paper" value="paper" v-model="wasteType" />
            <label for="paper">Paper</label><br>
            <input type="checkbox" name="plastic" id="plastic" value="plastic" v-model="wasteType" />
            <label for="plastic">Plastic</label><br>
            <input type="checkbox" name="landfill" id="landfill" value="lanfill" v-model="wasteType" />
            <label for="lanfill">Landfill</label><br>
            <input type="checkbox" name="electronic" id="electronic" value="elctronic" v-model="wasteType" />
            <label for="electronic">Electronic</label><br>
        </div>
        <button class="btn" type="submit">Apply</button>
        </form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            location: '',
            searchRadius: 1,
            wasteType: [],
        }
    },
    methods: {
        filterApplied() {
            this.$emit('formSubmit', {location: this.location,
                radius: this.searchRadius, wasteType: this.wasteType})
        }
    }
}
</script>

<style scoped>
    .locAndRad {
        display: inline-block;
        vertical-align: top;
        text-align: left;
        margin: 10px;
        margin-right: 20px;
    }
    .locAndRad > .section {
        margin: 15px;
    }
    .section > label {
        font-weight: bold;
    }
    .garbageTypeSelector {
        margin: 10px;
        margin-left: 20px;
        display: inline-block;
        vertical-align: top;
        text-align: left;
    }
    .garbageTypeSelector > * {
        margin: 5px
    }
    .btn {
        display: block;
        width: 100px;
        margin: auto;
        padding: 6px;
        background-color: #42b983;
        border: 1px solid #42b983;
        border-radius: 5px;
        color: #2c3e50;
        font-weight: bold;
    }
    p {
        font-weight: bold;
    }
</style>