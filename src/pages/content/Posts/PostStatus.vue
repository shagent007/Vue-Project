<template>
  <div :class="'badge badge-pill badge-'+status.class">{{status.text}}</div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop } from "vue-property-decorator";
import Component from "vue-class-component";

@Component
export default class PostStatus extends Vue {
  @Prop({ type: Number }) readonly state!: number;
  get status() {
    if (this.state === 0)
      return {
        text: "Черновик",
        class: "warning",
      };
    if (this.state === 1)
      return {
        text: "Опубликован",
        class: "success",
      };

    return {
      text: "Удалён",
      class: "danger",
    };
  }
}
</script>
