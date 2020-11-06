<template>
  <div id="app">
    <component :is="layout">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </component>

    <dialogs-wrapper transition-name="modal"></dialogs-wrapper>
  </div>
</template>

<script lang="ts">
const defaultLayout = "default";

import Vue from "vue";
import Component from "vue-class-component";
import { DialogsWrapper } from "vue-modal-dialogs";

@Component({
  components: {
    DialogsWrapper,
  },
})
export default class App extends Vue {
  get layout() {
    return (this.$route.meta.layout || defaultLayout) + "-layout";
  }
}
</script>

<style lang="scss">
@import "assets/base.scss";
@import "vue-select/src/scss/vue-select.scss";
</style>
