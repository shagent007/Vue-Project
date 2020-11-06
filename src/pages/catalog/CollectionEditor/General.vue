<template>
    <div class="main-card card">
        <div class="card-body">
            <form class="pb-4">
                <div class="position-relative row form-group">
                    <label for="name" class="col-sm-2 col-form-label"
                        >Название</label
                    >
                    <div class="col-sm-10">
                        <b-form-input
                            :value="value.name"
                            @change="onNameChange"
                        ></b-form-input>
                    </div>
                </div>

                <div class="position-relative row form-group">
                    <label for="name" class="col-sm-2 col-form-label"
                        >Код</label
                    >
                    <div class="col-sm-10">
                        <b-form-input
                            :value="value.code"
                            @change="onCodeChange"
                        ></b-form-input>
                    </div>
                </div>

                <div class="position-relative row form-group">
                    <label for="name" class="col-sm-2 col-form-label"
                        >Url категории</label
                    >
                    <div class="col-sm-10">
                        <b-form-input
                            :value="value.categorySlug"
                            @change="onSlugChange"
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
import { Prop } from "vue-property-decorator";
import { CollectionStateDto } from "@/api/clients";

@Component
export default class General extends Vue {
    @Prop({ required: true, type: Object }) readonly value!: CollectionStateDto;

    onNameChange(value: string | undefined) {
        this.value.name = value;
    }

    onCodeChange(value: string | undefined) {
        this.value.code = value;
    }

    onSlugChange(value: string | undefined) {
        this.value.categorySlug = value;
    }
}
</script>
