<template>
    <b-card class="mb-3">
        <form>
            <div class="position-relative row form-group">
                <label for="name" class="col-sm-2 col-form-label"
                    >lockoutEnabled</label
                >
                <div class="col-sm-10">
                    <b-form-checkbox
                        v-model="value.lockoutEnabled"
                    ></b-form-checkbox>
                </div>
            </div>

            <div class="position-relative row form-group">
                <label for="name" class="col-sm-2 col-form-label"
                    >accessFailedCount</label
                >
                <div class="col-sm-10">
                    <b-form-input
                        type="number"
                        :value="value.accessFailedCount"
                        @change="onChange"
                    ></b-form-input>
                </div>
            </div>

            <div class="position-relative row form-group">
                <label for="name" class="col-sm-2 col-form-label"
                    >lockoutEnd</label
                >
                <div class="col-sm-10">
                    <date-picker
                        v-model="value.lockoutEnd"
                        lang="ru"
                    ></date-picker>
                </div>
            </div>
        </form>
    </b-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { UserStateDto } from "@/api/clients";
import DatePicker from "vue2-datepicker";

@Component({
    components: {
        DatePicker
    }
})
export default class General extends Vue {
    @Prop({ required: true, type: Object }) readonly value!: UserStateDto;

    onChange(value: number) {
        this.value.accessFailedCount = value;
    }
}
</script>
