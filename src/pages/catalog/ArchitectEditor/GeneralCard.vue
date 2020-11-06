<template v-show="value">
    <div class="main-card mb-3 card">
        <div class="card-body">
            <h5 class="card-title">Общая информация</h5>

            <div class="position-relative row form-group">
                <label for="baseDescription" class="col-sm-2 col-form-label"
                    >Название</label
                >
                <div class="col-sm-10">
                    <b-form-input
                        class="form-control"
                        v-model="value.name"
                    ></b-form-input>
                </div>
            </div>

            <div class="position-relative row form-group">
                <label for="exwallsDescription" class="col-sm-2 col-form-label"
                    >Серия проекта</label
                >
                <div class="col-sm-10">
                    <b-form-input
                        type="number"
                        class="form-control"
                        v-model="value.projectSeries"
                    ></b-form-input>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import { Prop } from "vue-property-decorator";

@Component({
    components: {}
})
export default class ArchitectGeneralInformation extends Vue {
    @Prop({ type: Object, required: true }) readonly value!: {
        name?: string | undefined;
        projectSeries?: number | undefined;
    };
}
</script>
