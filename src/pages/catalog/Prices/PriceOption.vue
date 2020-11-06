<template>
  <td @click="onFocus">
    <div v-show="isEdit === false">{{value.price}}</div>
    <b-form-input
      ref="option"
      @blur="isEdit = false;"
      v-show="isEdit === true"
      v-model="value.price"
      @change="$emit('onChange')"
    ></b-form-input>
  </td>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Ref } from "vue-property-decorator";
import { PriceRuleOptionDto, PriceListDto } from "@/api/clients";
import { BFormInput } from "bootstrap-vue";

@Component
export default class PriceProjectTypeSelect extends Vue {
  @Prop({ required: true }) readonly value!: PriceRuleOptionDto;
  @Prop({ required: true }) readonly priceList!: PriceListDto;
  @Ref("option") readonly option!: BFormInput;

  onFocus() {
    if (this.priceList.isDraft) {
      this.isEdit = true;
      this.$nextTick(() => {
        this.option.focus();
      });
    }
  }

  isEdit = false;
}
</script>
