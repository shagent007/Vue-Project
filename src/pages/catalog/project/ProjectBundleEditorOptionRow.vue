<template>
  <tr>
    <td>
      <b-form-checkbox v-model="selected" @change="onSelectionChanged">
        {{
        option.name
        }}
      </b-form-checkbox>
    </td>
    <td>
      <b-form-input
        :disabled="!selected"
        v-model.number="count"
        :min="1"
        @change="onStateChanged"
        type="number"
      ></b-form-input>
    </td>
    <td>
      <b-form-input
        :disabled="!selected"
        v-model.number="price"
        :min="1"
        @change="onStateChanged"
        :placeholder="getRecommendedPrice()"
        type="number"
      ></b-form-input>
    </td>
    <td>{{ getTotal() }}</td>
  </tr>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import {
  OptionDto,
  ProjectBundleOptionStateDto,
  ProjectBundleOptionPriceDto,
} from "@/api/clients";

export type OptionRowState = {
  selected: boolean;
  optionId: number;
  count: number;
  price: number | undefined;
};

@Component
export default class ProjectBundleEditorOptionRow extends Vue {
  @Prop({ required: true, type: Object }) option!: OptionDto;
  @Prop({ required: true, type: Array })
  bundleOptions!: ProjectBundleOptionStateDto[];
  @Prop({ required: true, type: Array }) prices!: ProjectBundleOptionPriceDto[];

  selected = false;
  count = 1;
  price: number | undefined | null = null;
  total: number | undefined | null = null;
  priceRecommended: number | undefined | null = null;

  created() {
    this.initTotals();
    this.initSelection();

    this.bundleOptions.forEach((element) => {
      if (element.optionId == this.option.id) {
        this.count = element.count;
      }
    });
  }

  initSelection() {
    const bundleOption = this.bundleOptions.find(
      (x) => x.optionId == this.option.id
    );
    if (bundleOption) {
      this.selected = true;
    } else {
      this.selected = false;
    }
  }

  initTotals() {
    const price = this.prices.find((x) => x.optionId == this.option.id);
    if (price) {
      this.total = price.total;
      this.priceRecommended = price.priceRecommended;
    } else {
      this.total = undefined;
      this.priceRecommended = undefined;
    }
  }

  @Watch("prices")
  onPricesChanged() {
    this.initTotals();
  }

  @Watch("bundleOptions")
  onBundleOptionsChanged() {
    this.initSelection();
  }

  getState() {
    return {
      selected: this.selected,
      optionId: this.option.id,
      price: this.price,
      count: this.count,
    } as OptionRowState;
  }

  onSelectionChanged(checked: boolean) {
    const state = this.getState();
    state.selected = checked;
    this.$emit("on-state-changed", state);
  }

  onStateChanged() {
    const state = this.getState();
    this.$emit("on-state-changed", state);
  }

  getTotal() {
    if (this.selected && this.total) return this.total;

    return "";
  }

  getRecommendedPrice() {
    if (this.selected && this.priceRecommended)
      return this.priceRecommended.toString();

    return "";
  }
}
</script>
