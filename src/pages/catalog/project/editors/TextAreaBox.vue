<template>
    <b-form-textarea
        :value="value" @input="onChange"
        rows="10"
    ></b-form-textarea>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class TextAreaBox extends Vue {
    @Prop({ type: String }) readonly value!: string | null | undefined;

    onChange(value: string) {
        this.$emit('input', value);
    }
}
</script>
