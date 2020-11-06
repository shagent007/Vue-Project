<template>
    <div class="main-card mb-3 card">
        <div class="card-body">
            <h5 class="card-title">Общая информация</h5>
            <form class>
                <div class="position-relative row form-group">
                    <label for="sku" class="col-sm-2 col-form-label"
                        >Название</label
                    >
                    <div class="col-sm-10">
                        <b-form-input
                            v-model="value.name"
                            class="form-control"
                        ></b-form-input>
                    </div>
                </div>

                <div class="position-relative row form-group">
                    <label for="sku" class="col-sm-2 col-form-label"
                        >Код проекта</label
                    >
                    <div class="col-sm-10">
                        <b-form-input
                            v-model="value.projectCode"
                            class="form-control"
                        ></b-form-input>
                    </div>
                </div>

                <div class="position-relative row form-group">
                    <label for="sku" class="col-sm-2 col-form-label"
                        >Серия проекта</label
                    >
                    <div class="col-sm-10">
                        <b-form-input
                            type="number"
                            v-model="value.projectSeries"
                            class="form-control"
                        ></b-form-input>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ProjectTypeStateDto } from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";
import { Prop, Ref } from "vue-property-decorator";

@Component
export default class ProjectTypeEditor extends Vue {
    @Prop({ required: true, type: Object })
    readonly value!: ProjectTypeStateDto;
}
</script>
