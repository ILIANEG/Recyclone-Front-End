<template>
    <div>
        <form @submit.prevent id="filterForm">
        <div class="garbageTypeSelector">
            <p>Waste Type:</p>
            <input type="checkbox" name="paper" id="paper" value="paper" v-model="wasteType" />
            <label for="paper">Paper</label>
            <select name="paper" id="paper" v-model="binColor.paper">
                <BaseColorOptions class="colorSelection" />
            </select><br>
            <input type="checkbox" name="plastic" id="plastic" value="plastic" v-model="wasteType" />
            <label for="plastic">Plastic</label>
            <select name="plastic" id="plastic" v-model="binColor.plastic">
                <BaseColorOptions class="colorSelection" />
            </select><br>
            <input type="checkbox" name="landfill" id="landfill" value="landfill" v-model="wasteType" />
            <label for="landfill">Landfill</label>
            <select name="landfill" id="landfill" v-model="binColor.landfill">
                <BaseColorOptions class="colorSelection" />
            </select><br>
            <input type="checkbox" name="electronic" id="electronic" value="elctronic" v-model="waste" />
            <label for="electronic">Electronic</label>
            <select name="electronic" id="electronic" v-model="binColor.electronic">
                <BaseColorOptions class="colorSelection" />
            </select>
        </div>
        <button class="btn" type="submit" @click="submit">Add</button>
        </form>
    </div>
</template>

<script>
import BaseColorOptions from './BaseColorOptions'

export default {
    components: {BaseColorOptions},
    data () {
        return {
            searchRadius: 1,
            wasteType: [],
            binColor: {},
        }
    },
    methods: {
        submit() {
            this.$emit('formSubmit', {rad: this.searchRadius, waste: this.wasteType, color: new Map(Object.entries(this.binColor))})
        },
    }
}
</script>

<style scoped>
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
        cursor: pointer;
    }
</style>