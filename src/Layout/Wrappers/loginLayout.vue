<template>
  <div class="app-container app-theme-white">
    <slot></slot>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component";

    @Component({
        name: "app"
    })
    export default class LoginLayout extends Vue {
    }
</script>

<style>

</style>
