<template>
    <b-form-checkbox :checked="value" @input="onChange"></b-form-checkbox>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Prop, Watch} from "vue-property-decorator";

@Component
export default class CheckBox extends Vue {
    @Prop({ type: Boolean }) readonly value!: boolean | null | undefined;

    onChange(value: boolean) {
        this.$emit('input', value);
    }
}
</script>
