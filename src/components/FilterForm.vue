<template>
    <div>
        <form @submit.prevent id="filterForm">
        <div class="locAndRad">
            <div class="section">
                <label for="location">Location:</label><br>
                <input id="location" type="text"><br>
            </div>
            <div class="section">
                <label for="rad">Radius:</label><br>
                <input type="range" id="rad" min="1" max="100" v-model="searchRadius"><br>
                <label for="rad">{{ searchRadius }} km</label><br>
            </div>
        </div>
        <div class="garbageTypeSelector">
            <p>Waste Type:</p>
            <input type="checkbox" name="paper" id="paper" value="paper" v-model="wasteType" />
            <label for="paper">Paper</label><br>
            <input type="checkbox" name="plastic" id="plastic" value="plastic" v-model="wasteType" />
            <label for="plastic">Plastic</label><br>
            <input type="checkbox" name="lanfill" id="lanfill" value="lanfill" v-model="wasteType" />
            <label for="lanfill">Landfill</label><br>
            <input type="checkbox" name="electronic" id="electronic" value="elctronic" v-model="wasteType" />
            <label for="electronic">Electronic</label><br>
        </div>
        </form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            searchRadius: 1,
            wasteType: [],
        }
    },
    methods: {
        test() {
            console.log(this.wasteType)
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
</style>