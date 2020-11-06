<template>

  <div>
    <b-card class="mb-2" v-for="(group,i) in model.groups" :key="i" :title="group.name">
      <div
        class="position-relative row form-group"
        v-for="(property,j) in getProperties(group.code)"
        :key="j"
      >
        <label class="col-sm-2 col-form-label">{{property.name}}</label>
        <div class="col-sm-10">
            <component v-bind:is="property.editor" v-model="value.attributes[property.code]"></component>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Prop, Watch} from "vue-property-decorator";
import {ProjectStateDto, ProjectTypeStateDto} from "@/api/clients.ts";
import applicationFacade from "@/api/applicationFacade";
import NumberBox from "@/pages/catalog/project/editors/NumberBox.vue";
import CheckBox from "@/pages/catalog/project/editors/CheckBox.vue";
import TextBox from "@/pages/catalog/project/editors/TextBox.vue";
import HtmlBox from "@/pages/catalog/project/editors/HtmlBox.vue";
import TextAreaBox from "@/pages/catalog/project/editors/TextAreaBox.vue";

@Component({
    components: {
        NumberBox,
        CheckBox,
        TextBox,
        HtmlBox,
        TextAreaBox
    }
})
export default class GroupCard extends Vue {

    @Prop({type: Object}) readonly value!: ProjectStateDto

    model = new ProjectTypeStateDto();

    @Watch("value.projectTypeId")
    async onValueChanged(n: any, o: any) {
        console.log("onValueChanged", n, o);
        const model = await applicationFacade.projectTypes.get(this.value.projectTypeId);
        this.model = ProjectTypeStateDto.fromJS(model.toJSON());
    }

    getProperties(code: string) {

        if (!this.model || !this.model.properties) {
            return [];
        }

        return this.model.properties.filter((x) => x.group === code);

    }
}
</script>
