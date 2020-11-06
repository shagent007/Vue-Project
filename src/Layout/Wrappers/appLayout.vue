<template>
    <div class="app-container app-theme-white">
        <transition name="fade" mode="out-in" appear>
            <Header :headerbg="headercolor"/>
        </transition>
        <transition name="fade" mode="out-in" appear>
            <Sidebar :sidebarbg="sidebarcolor"/>
        </transition>
        
        <div class="app-main__outer">
            <div class="app-main__inner p-0">
                <slot></slot>
            </div>

            <transition name="fade" mode="out-in" appear>
                <Footer/>
            </transition>
        </div>
    </div>
</template>

<script  lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component";
    
    import Header from "../Components/Header.vue";
    import Sidebar from "../Components/Sidebar.vue";
    import Footer from "../Components/Footer.vue";

    import VuePerfectScrollbar from 'vue-perfect-scrollbar'

    import {library} from '@fortawesome/fontawesome-svg-core'
    import {
        faCog,
    } from '@fortawesome/free-solid-svg-icons'
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

    library.add(
        faCog,
    );

    @Component({
        name: 'app',
        components: {
            Header,
            Sidebar,
            Footer,
            VuePerfectScrollbar,
            'font-awesome-icon': FontAwesomeIcon,
        }
    })
    export default class AppLayout extends Vue {

        headercolor: string | null = null;
        sidebarcolor: string | null = null;
    }
</script>
