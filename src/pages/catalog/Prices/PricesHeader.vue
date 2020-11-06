<template>
  <tbody>
    <tr>
      <th>Условие</th>
      <th v-for="item in options" :key="item.id">{{ item.name }}</th>
      <th></th>
    </tr>
  </tbody>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { OptionDto } from "@/api/clients";

@Component
export default class PricesHeader extends Vue {
  @Prop({ required: true, type: Array }) readonly options!: OptionDto[];
}
</script>

<style scoped>
td,
th {
  text-align: center;
}
</style>
