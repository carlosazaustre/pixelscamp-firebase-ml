<template>
  <div id="app">
    <app-header v-bind:isHotdog="isHotdog"></app-header>
    <app-image v-on:upload="changeHeader"></app-image>
  </div>
</template>

<script>
module.exports = {
  name: 'app',

  data () {
    return {
      isHotdog: false
    }
  },

  methods: {
    changeHeader ({ isHotdog }) {
      this.isHotdog = isHotdog
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
    padding: 0;
  }
</style>

