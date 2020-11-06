<template>
    <b-card class="mb-3">
        <form>
            <div class="position-relative row form-group">
                <label for="name" class="col-sm-2 col-form-label"
                    >Имя пользователя</label
                >
                <div class="col-sm-10">
                    <b-form-input
                        :value="value.userName"
                        @change="onChangeName"
                    ></b-form-input>
                </div>
            </div>

            <div class="position-relative row form-group">
                <label for="name" class="col-sm-2 col-form-label">Почта</label>
                <div class="col-sm-10">
                    <b-form-input
                        type="email"
                        :value="value.email"
                        @change="onChangeEmail"
                    ></b-form-input>
                </div>
            </div>

            <div class="position-relative row form-group">
                <label for="name" class="col-sm-2 col-form-label"
                    >Номер телефона</label
                >
                <div class="col-sm-10">
                    <b-form-input
                        type="number"
                        :value="value.phoneNumber"
                        @change="onChangePhoneNamber"
                    ></b-form-input>
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
@Component
export default class General extends Vue {
    @Prop({ required: true, type: Object }) readonly value!: UserStateDto;

    onChangeName(value: string | undefined) {
        this.value.userName = value;
    }

    onChangeEmail(value: string | undefined) {
        this.value.email = value;
    }

    onChangePhoneNamber(value: string | undefined) {
        this.value.phoneNumber = value;
    }
}
</script>
