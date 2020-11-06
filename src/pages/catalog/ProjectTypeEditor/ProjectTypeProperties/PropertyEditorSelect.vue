<template>
  <v-select
    :value="value"
    @input="onChanged"
    :options="items"
    :disabled="disabled"
  ></v-select>
</template>

<script lang="ts">

import Vue from "vue";
import Component from "vue-class-component";
import {Prop, Watch} from "vue-property-decorator";
import vSelect from "vue-select";

@Component({
  components: {
    vSelect
  }
})
export default class PropertyEditorSelect extends Vue {
    @Prop({type: String }) readonly value!: string;
    @Prop({type: Array, required: true}) readonly items!: string[];
    @Prop({type: Boolean, default: false}) readonly disabled?: boolean;

    onChanged(value: string) {
        console.log("PropertyEditorSelect:input",  value);
        this.$emit("input", value);
    }
}
</script>


<style>
.v-application ul,
.v-application ol {
  padding: 0px !important;
}
</style>

