<template>
  <tr>
    <td>
      <b-form-checkbox v-model="checked">{{ option.name }}</b-form-checkbox>
    </td>
    <td>
      <b-form-input :disabled="itHas === false" v-model.number="count" type="number"></b-form-input>
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { OptionDto, BundleOptionStateDto } from "@/api/clients";

@Component
export default class BundleOptions extends Vue {
  @Prop({ required: true, type: Object }) option!: OptionDto;
  @Prop({ required: true, type: Array }) options!: Array<BundleOptionStateDto>;

  count = 0;
  currentIndex = 0;
  itHas = false;

  searchIndex() {
    for (let index = 0; index < this.options.length; index++) {
      if (this.options[index].optionId == this.option.id) {
        this.currentIndex = index;
        break;
      }
    }
  }

  get checked() {
    return (this.itHas =
      this.options?.find((item) => item.optionId === this.option.id) !=
      undefined);
  }

  set checked(value: boolean) {
    this.itHas = value;
    if (value) {
      const option = new BundleOptionStateDto();
      option.optionId = this.option.id;
      option.count = 1;
      this.count = option.count;
      this.options.push(option);
    } else {
      this.options.splice(this.currentIndex, 1);
    }
    this.$emit("update", this.options);
  }

  created() {
    for (let index = 0; index < this.options.length; index++) {
      if (this.options[index].optionId == this.option.id) {
        this.count = this.options[index].count;
        break;
      } else this.count = 0;
    }
  }

  @Watch("count")
  onCountChange(value: number) {
    this.searchIndex();
    this.options[this.currentIndex].count = value;
    this.$emit("update", this.options);
  }
}
</script>
