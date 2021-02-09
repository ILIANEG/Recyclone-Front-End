<template>
  <div class="buttonBody" @click="toggle">
      <span>Filter</span>
      <span v-if="!opened" class="dropDownSymbol">▾</span>
      <span v-if="opened" class="dropDownSymbol">▴</span>
  </div>
</template>

<script>
export default {
    data () {
        return {
            opened: false,
        }
    },
    methods: {
        toggle() {
            this.opened = !this.opened
            this.$emit("buttonToggle")
        }
    }
}
</script>

<style>
    .buttonBody {
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        padding: 1px;
        width: 80px;
        border: 1px solid #42b983;
        border-width: 0px 0px 2px;
        color: #2c3e50;
        text-decoration: bold;
        letter-spacing: 2px;
        font-weight: bold;
    }
    .buttonBody:hover {
        cursor: pointer;
    }
    .dropDownSymbol {
        font-size: 20px;
        margin-left: 10px;
    }
</style>