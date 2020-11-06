<template>
    <div class="d-flex">
        <div class="header-btn-lg pr-0">
            <div class="widget-content p-0">
                <div class="widget-content-wrapper">
                    <div class="widget-content-left ml-3 header-user-info">
                        <div class="widget-heading">{{ name }}</div>
                        <div class="widget-subheading">
                            <span v-for="(item, index) in role" :key="index">
                                <span
                                    :class="{
                                        'pr-1': index < role.length - 1,
                                        'pl-1': index > 0
                                    }"
                                    >{{ item }}</span
                                >
                                <span v-if="index < role.length - 1">,</span>
                            </span>
                        </div>
                    </div>
                    <div class="widget-content-left ml-3 header-user-info">
                        <action-button
                            className="btn-pill btn-shadow btn-shine btn btn-focus"
                            :action="logOut"
                            >Выход</action-button
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { userModule } from "@/store/modules/user";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faAngleDown,
    faCalendarAlt,
    faTrashAlt,
    faCheck,
    faFileAlt,
    faCloudDownloadAlt,
    faFileExcel,
    faFilePdf,
    faFileArchive,
    faEllipsisH
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import ActionButton from "@/pages/common/ActionButton.vue";
library.add(
    faAngleDown,
    faCalendarAlt,
    faTrashAlt,
    faCheck,
    faFileAlt,
    faCloudDownloadAlt,
    faFileExcel,
    faFilePdf,
    faFileArchive,
    faEllipsisH
);

@Component({
    components: {
        "font-awesome-icon": FontAwesomeIcon,
        ActionButton
    }
})
export default class HeaderUserArea extends Vue {
    get role() {
        return userModule.role;
    }

    get name() {
        return userModule.userName;
    }

    async logOut() {
        await userModule.logout();
        await this.$router.push("/login");
    }
}
</script>
