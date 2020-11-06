<template>
    <div class="main-card card">
        <div class="card-body">
            <form class="pb-4">
                <div class="row">
                    <div class="col-sm-4 pb-6">
                        <main-image
                            v-model="value.image"
                            :folder="imageFolder"
                            imageId="CategoryMainImage"
                            @update="onImageUpdate($event)"
                        />
                    </div>

                    <div class="col-md-8">
                        <div class="position-relative row form-group">
                            <label for="name" class="col-sm-2 col-form-label"
                                >Название</label
                            >
                            <div class="col-sm-10">
                                <b-form-input
                                    :value="value.shortName"
                                    @change="onChange"
                                    placeholder="Введите название"
                                ></b-form-input>
                            </div>
                        </div>

                        <div class="position-relative row form-group">
                            <label for="name" class="col-sm-2 col-form-label"
                                >Статус</label
                            >
                            <div class="col-sm-10">
                                <category-status :state="value.state" />
                            </div>
                        </div>

                        <div class="position-relative row form-group">
                            <label for="name" class="col-sm-2 col-form-label"
                                >Дата создания</label
                            >
                            <div class="col-sm-10">
                                <b-form-input
                                    :disabled="true"
                                    :value="createDate"
                                ></b-form-input>
                            </div>
                        </div>

                        <div class="position-relative row form-group">
                            <label for="name" class="col-sm-2 col-form-label"
                                >Дата изменения</label
                            >
                            <div class="col-sm-10">
                                <b-form-input
                                    :disabled="true"
                                    :value="modifiedDate"
                                ></b-form-input>
                            </div>
                        </div>

                        <div class="position-relative row form-group">
                            <label
                                for="category"
                                class="col-sm-2 col-form-label"
                                >Родительская Категория</label
                            >
                            <div class="col-sm-10">
                                <category-select
                                    :filterConfig="categoryFilterConfig"
                                    :disabled="true"
                                    v-model="value.parentId"
                                />
                            </div>
                        </div>
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
import moment from "moment";
import CategorySelect from "@/pages/content/common/CategorySelect.vue";
import { CategoryStateDto } from "@/api/clients";
import { SearchCategoryCommand } from "@/api/content/SearchCategoryCommand.ts";

import { ImageDto } from "@/api/clients";
import CategoryStatus from "@/pages/content/Categories/CategoryStatus.vue";
import MainImage from "@/pages/common/MainImage.vue";

@Component({
    components: {
        CategorySelect,
        CategoryStatus,
        MainImage
    }
})
export default class General extends Vue {
    @Prop({ required: true, type: Object }) readonly value!: CategoryStateDto;

    categoryFilterConfig = new SearchCategoryCommand();

    get imageFolder() {
        return `journal/categories/${this.value.id}`;
    }

    created() {
        this.categoryFilterConfig.states = [0, 1, 2];
    }

    onChange(value: string | undefined) {
        this.value.shortName = value;
    }

    get createDate() {
        return moment(this.value.createdAt).format("DD-MM-YY hh:mm");
    }

    get modifiedDate() {
        return moment(this.value.modifiedAt).format("DD-MM-YY hh:mm");
    }

    onImageUpdate(event: ImageDto | undefined) {
        this.value.image = event;
    }
}
</script>
