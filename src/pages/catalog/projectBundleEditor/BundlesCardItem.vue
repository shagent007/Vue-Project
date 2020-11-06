<template>
    <div>
        <div class="widget-content p-0">
            <div class="widget-content-wrapper">
                <div class="widget-content-left mr-2">
                    <b-checkbox :checked="isSelected" @change="onSelectionChanged(!isSelected)"></b-checkbox>
                </div>
                <div class="widget-content-left">
                    <div class="widget-heading">{{bundle.name}}
                    </div>
                    <div class="widget-subheading">
                        <i>Скидка: {{ bundle.discount }}%</i>
                        <i>Цена: {{ bundle.price }}</i>
                    </div>
                </div>
                <div class="widget-content-right widget-content-actions">
                    <button class="border-0 btn-transition btn btn-outline-success">
                        <font-awesome-icon icon="edit"/>
                    </button>
                    <button class="border-0 btn-transition btn btn-outline-danger">
                        <font-awesome-icon icon="trash-alt"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import _ from "lodash"
    import Component from "vue-class-component";
    import Vue from "vue";
    import {Prop} from "vue-property-decorator";
    import {
        OptionDto,
        ProjectBundleStateDto, ProjectBundleOptionStateDto
    } from "@/api/clients";


    @Component
    export default class ProjectBundleOptionRow extends Vue {
        @Prop({type: Object}) readonly projectBundle!: ProjectBundleStateDto;
        @Prop({type: Object}) readonly option!: OptionDto;
        @Prop({type: Object}) readonly value!: ProjectBundleOptionStateDto;

        items: ProjectBundleStateDto[] = [];
        
        get isSelected() {
            if(!this.value)
                return false;
            
            return _.some(this.projectBundle.options, x => x.optionId == this.value.optionId);
        }

        onSelectionChanged(selected: boolean) {
        }
    }
</script>

