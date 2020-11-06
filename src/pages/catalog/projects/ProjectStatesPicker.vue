<template>
    <div>
        <b-form-checkbox v-model="publish">Опубликован</b-form-checkbox>
        <b-form-checkbox v-model="draft">Черновик</b-form-checkbox>
        <b-form-checkbox v-model="removed">Удалён</b-form-checkbox>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { ProjectState } from "@/api/clients.ts";

@Component
export default class ProjectStatesPicker extends Vue {
    @Prop({ required: true, type: Array }) value!: Array<ProjectState>;

    get publish() {
        if (this.value) return this.value.find(item => item === 1) != undefined;
        return false;
    }

    set publish(value: boolean) {
        value
            ? this.value.push(1)
            : this.value.splice(this.value.indexOf(1), 1);
    }

    get draft() {
        if (this.value) return this.value.find(item => item === 0) != undefined;
        return false;
    }

    set draft(value: boolean) {
        value
            ? this.value.push(0)
            : this.value.splice(this.value.indexOf(0), 1);
    }

    get removed() {
        if (this.value) return this.value.find(item => item === 2) != undefined;
        return false;
    }

    set removed(value: boolean) {
        value
            ? this.value.push(2)
            : this.value.splice(this.value.indexOf(2), 1);
    }
}
</script>
