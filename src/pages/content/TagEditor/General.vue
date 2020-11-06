<template>
    <div class="main-card card">
        <div class="card-body">
            <form>
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
                                    @change="onChangeName"
                                    placeholder="Введите название"
                                ></b-form-input>
                            </div>
                        </div>

                        <div class="position-relative row form-group">
                            <label for="name" class="col-sm-2 col-form-label"
                                >Статус</label
                            >
                            <div class="col-sm-10">
                                <tag-status :state="value.state" />
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
import { TagStateDto } from "@/api/clients";

import { ImageDto } from "@/api/clients";
import TagStatus from "@/pages/content/TagEditor/TagStatus.vue";
import MainImage from "@/pages/common/MainImage.vue";

@Component({
    components: {
        TagStatus,
        MainImage
    }
})
export default class General extends Vue {
    @Prop({ required: true, type: Object }) readonly value!: TagStateDto;

    get imageFolder() {
        return `journal/tags/${this.value.id}`;
    }

    onImageUpdate(event: ImageDto | undefined) {
        this.value.image = event;
    }

    onChangeName(value: string | undefined) {
        this.value.shortName = value;
    }

    get createDate() {
        return moment(this.value.createdAt).format("DD-MM-YY hh:mm");
    }

    get modifiedDate() {
        return moment(this.value.modifiedAt).format("DD-MM-YY hh:mm");
    }
}
</script>
