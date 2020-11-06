<template>
  <div
    :class="sidebarbg"
    class="app-sidebar sidebar-shadow"
    @mouseover="toggleSidebarHover('add', 'closed-sidebar-open')"
    @mouseleave="toggleSidebarHover('remove', 'closed-sidebar-open')"
  >
    <div class="app-header__logo">
      <div class="logo-src" />
      <div class="header__pane ml-auto">
        <button
          type="button"
          class="hamburger close-sidebar-btn hamburger--elastic"
          v-bind:class="{ 'is-active': isOpen }"
          @click="toggleBodyClass('closed-sidebar')"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </div>
    <div class="app-sidebar-content">
      <VuePerfectScrollbar class="app-sidebar-scroll" v-once>
        <sidebar-menu showOneChild :menu="menu" />
      </VuePerfectScrollbar>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

import { SidebarMenu } from "vue-sidebar-menu";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

@Component({
  components: {
    SidebarMenu,
    VuePerfectScrollbar,
  },
})
export default class General extends Vue {
  @Prop({ type: String }) readonly sidebarbg!: string;

  isOpen = false;
  sidebarActive = false;

  menu = [
    {
      header: true,
      title: "Каталог",
    },
    {
      icon: "pe-7s-graph2",
      title: "Проекты",
      href: "/catalog/projects",
    },
    {
      icon: "pe-7s-graph2",
      title: "Архитекторы",
      href: "/catalog/architects",
    },
    {
      icon: "pe-7s-graph2",
      title: "Цены",
      href: "/catalog/prices",
    },
    {
      icon: "pe-7s-graph2",
      title: "Категории",
      href: "/catalog/categories",
    },
    {
      icon: "pe-7s-graph2",
      title: "Коллекции",
      href: "/catalog/collection",
    },

    {
      title: "Справочники",
      icon: "pe-7s-browser",
      child: [
        {
          href: "/catalog/project-types",
          title: "Типы проектов",
        },
        {
          href: "/catalog/materials",
          title: "Материалы",
        },
        {
          href: "/catalog/materials-group",
          title: "Группы Материалов",
        },
        {
          href: "/catalog/options",
          title: "Опции",
        },
        {
          href: "/catalog/options-group",
          title: "Группы опций",
        },
        {
          href: "/catalog/bundles",
          title: "Комплекты",
        },
      ],
    },
    {
      icon: "pe-7s-graph2",
      header: true,
      title: "География",
    },
    {
      icon: "pe-7s-graph2",
      title: "Города",
      href: "/geo/cities",
    },
    {
      icon: "pe-7s-graph2",
      title: "Регионы",
      href: "/geo/regions",
    },
    {
      icon: "pe-7s-graph2",
      title: "Округа",
      href: "/geo/areas",
    },
    {
      header: true,
      title: "Контент",
    },
    {
      icon: "pe-7s-graph2",
      title: "Статьи",
      href: "/content/posts",
    },
    {
      icon: "pe-7s-graph2",
      title: "Категории",
      href: "/content/categories",
    },
    {
      icon: "pe-7s-graph2",
      title: "Теги",
      href: "/content/tags",
    },
    {
      icon: "pe-7s-graph2",
      header: true,
      title: "Сайт",
    },
    {
      icon: "pe-7s-graph2",
      title: "Странцы",
      href: "/site/pages",
    },
    {
      icon: "pe-7s-graph2",
      title: "Пользователи",
      href: "/site/users/",
    },
    {
      icon: "pe-7s-graph2",
      title: "Правила переадресации",
      href: "/site/redirect-rules",
    },
    {
      icon: "pe-7s-graph2",
      title: "Настройки",
      href: "/site/settings",
    },
  ];
  collapsed = true;

  windowWidth = 0;

  toggleBodyClass(className: string) {
    const el = document.body;
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      el.classList.add(className);
    } else {
      el.classList.remove(className);
    }
  }

  toggleSidebarHover(add: string, className: string) {
    const el = document.body;
    this.sidebarActive = !this.sidebarActive;

    this.windowWidth = document.documentElement.clientWidth;

    if (this.windowWidth > 992) {
      if (add === "add") {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    }
  }

  getWindowWidth() {
    const el = document.body;

    this.windowWidth = document.documentElement.clientWidth;

    if (this.windowWidth < 1350) {
      el.classList.add("closed-sidebar", "closed-sidebar-md");
    } else {
      el.classList.remove("closed-sidebar", "closed-sidebar-md");
    }
  }

  mounted() {
    this.$nextTick(function () {
      window.addEventListener("resize", this.getWindowWidth);

      //Init
      this.getWindowWidth();
    });
  }

  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth);
  }
}
</script>
