<template>
  <td @click="onFocus">
    <div v-if="isEdit === false">{{value.query}}</div>
    <b-form-input
      @change="$emit('onChange')"
      ref="query"
      @blur="isEdit = false;"
      v-else
      v-model="value.query"
    ></b-form-input>
  </td>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Ref } from "vue-property-decorator";
import { PriceRuleStateDto, PriceListDto } from "@/api/clients";
import { BFormInput } from "bootstrap-vue";

@Component
export default class PriceProjectTypeSelect extends Vue {
  @Prop({ required: true }) readonly value!: PriceRuleStateDto;
  @Prop({ required: true }) readonly priceList!: PriceListDto;
  @Ref("query") readonly query!: BFormInput;

  onFocus() {
    if (this.priceList.isDraft) {
      this.isEdit = true;
      this.$nextTick(() => {
        this.query.focus();
      });
    }
  }

  isEdit = false;
}
</script>
