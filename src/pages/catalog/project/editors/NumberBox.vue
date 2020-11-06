<template>
    <b-form-input class="form-control" :value="value"  @input="onChange" type="number" ></b-form-input>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class NumberBox extends Vue {
    @Prop({ type: Number }) readonly value!: number | null | undefined;

    onChange(value: number) {
        this.$emit('input', Number(value));
    }
}
</script>
