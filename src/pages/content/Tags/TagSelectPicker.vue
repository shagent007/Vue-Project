<template>
  <div>
    <b-form-checkbox v-model="isTrue">{{tag.name}}</b-form-checkbox>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { TagDto } from "@/api/clients.ts";
import applicationFacade from "@/api/applicationFacade";

@Component
export default class TagSelectPicker extends Vue {
  @Prop({ required: true, type: Object }) tag!: TagDto;
  @Prop({ required: true }) tags!: Array<number>;

  get isTrue() {
    return this.tags?.find((x) => x == this.tag.id) != undefined;
  }

  set isTrue(value: boolean) {
    this.$emit("select", {
      selected: value,
      tag: this.tag,
    });
  }
}
</script>
