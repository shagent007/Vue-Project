<template>
    <b-form-input class="form-control"  :value="value" @input="onChange" type="text"></b-form-input>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class TextBox extends Vue {
    @Prop({ type: String }) readonly value!: string | null | undefined;

    onChange(value: string) {
        this.$emit('input', value);
    }
}
</script>
