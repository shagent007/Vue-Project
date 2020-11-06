<template>
  <div>
    <b-form-checkbox v-model="isTrue">{{role}}</b-form-checkbox>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import applicationFacade from "@/api/applicationFacade";

@Component
export default class RoleSelectCheckbox extends Vue {
  @Prop({ required: true, type: String }) role!: string;
  @Prop({ required: true }) roles!: Array<string>;

  get isTrue() {
    return this.roles?.find((x) => x == this.role) != undefined;
  }

  set isTrue(value: boolean) {
    this.$emit("select", {
      selected: value,
      role: this.role,
    });
  }
}
</script>
