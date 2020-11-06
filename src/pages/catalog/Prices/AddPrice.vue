<template>
    <tbody>
        <tr>
            <td>
                <b-form-input v-model="value.query" type="text"></b-form-input>
            </td>
            <td v-for="option in value.options" :key="option.optionId">
                <b-form-input v-model="option.price" type="text"></b-form-input>
            </td>
            <td>
                <action-button className="btn-primary btn-sm" :action="emit"
                    >Добавить</action-button
                >
            </td>
        </tr>
    </tbody>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import ProjectTypeSelect from "@/pages/catalog/common/ProjectTypeSelect.vue";
import { PriceRuleStateDto } from "@/api/clients";
import ActionButton from "@/pages/common/ActionButton.vue";

@Component({
    components: {
        ProjectTypeSelect,
        ActionButton
    }
})
export default class AddPrice extends Vue {
    @Prop({ required: true }) readonly value!: PriceRuleStateDto;

    emit() {
        this.$emit("onAdd");
    }
}
</script>

<style scoped>
td,
th {
    text-align: center;
}
</style>
