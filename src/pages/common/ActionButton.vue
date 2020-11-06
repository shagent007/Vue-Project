<template>
  <b-overlay
    :show="busy"
    rounded
    opacity="0"
    spinner-small
    spinner-variant="light"
    class="d-inline-block"
  >
    <button type="button" class="btn" :class="className" @click.prevent="onClick">
      <div :class="{ ' hide-text ': busy }">
        <slot></slot>
      </div>
    </button>
  </b-overlay>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Ref } from "vue-property-decorator";
import { BButton } from "bootstrap-vue";

@Component
export default class ActionButton extends Vue {
  @Ref("button") readonly button!: BButton;
  @Prop({ type: String, default: "btn-primary" }) readonly className!: string;
  @Prop({ type: Function }) readonly action!: Function;
  busy = false;
  async onClick() {
    if (this.busy) return;
    this.busy = true;
    try {
      await this.action();
    } finally {
      this.busy = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.hide-text {
  color: transparent;
}
</style>
