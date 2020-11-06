import Vue from "vue";
import Router, { Route } from "vue-router";
import { userModule } from "@/store/modules/user";
Vue.use(Router);
/* eslint-disable */
function requireAuth(to: any, from: any, next: any) {
    userModule.init();

    if (!userModule.isSignedIn) {
        next({
            path: "/login",
            query: { redirect: to.fullPath }
        });
    } else {
        next();
    }
}

export default new Router({
    mode: "history",
    scrollBehavior() {
        return window.scrollTo({ top: 0, behavior: "smooth" });
    },
    routes: [
        {
            path: "/",
            redirect: "/catalog/projects"
        },
        // /catalog/
        {
            path: "/catalog/projects",
            name: "projects",
            beforeEnter: requireAuth,
            component: () => import("../pages/catalog/projects/Projects.vue")
        },
        {
            path: "/catalog/project/:id",
            name: "project",
            beforeEnter: requireAuth,
            props: (route: Route) => {
                return {
                    id: Number(route.params.id)
                };
            },
            component: () => import("../pages/catalog/project/Project.vue")
        },
        {
            path: "/catalog/project-types",
            name: "project-types",
            beforeEnter: requireAuth,
            component: () =>
                import("../pages/catalog/ProjectType/ProjectType.vue")
        },
        {
            path: "/catalog/project-types/:id",
            name: "project-type-page",
            beforeEnter: requireAuth,
            component: () =>
                import(
                    "../pages/catalog/ProjectTypeEditor/ProjectTypeEditor.vue"
                )
        },

        {
            path: "/catalog/architects",
            name: "architects",
            beforeEnter: requireAuth,
            component: () =>
                import("../pages/catalog/Architects/Architects.vue")
        },
        {
            path: "/catalog/architects/:id",
            name: "architect-page",
            beforeEnter: requireAuth,
            component: () =>
                import("../pages/catalog/ArchitectEditor/ArchitectEditor.vue")
        },
        {
            path: "/catalog/materials",
            name: "materials",
            beforeEnter: requireAuth,
            component: () => import("../pages/catalog/Materials/Materials.vue")
        },
        {
            path: "/catalog/materials-group",
            name: "materials-group",
            beforeEnter: requireAuth,
            component: () =>
                import("../pages/catalog/MaterialsGroup/MaterialsGroup.vue")
        },
        {
            path: "/catalog/options",
            name: "options",
            beforeEnter: requireAuth,
            component: () => import("../pages/catalog/Options/Options.vue")
        },
        {
            path: "/catalog/options-group",
            name: "options-group",
            beforeEnter: requireAuth,
            component: () =>
                import("../pages/catalog/OptionGroup/OptionGroup.vue")
        },
        {
            path: "/catalog/bundles",
            name: "bundles",
            beforeEnter: requireAuth,
            component: () => import("../pages/catalog/Bundles/Bundles.vue")
        },
        {
            path: "/catalog/categories",
            name: "categories",
            beforeEnter: requireAuth,
            component: () =>
                import("../pages/catalog/Categories/Categories.vue")
        },
        {
            path: "/geo/regions",
            name: "regions",
            beforeEnter: requireAuth,
            component: () => import("../pages/geo/Regions/Regions.vue")
        },
        {
            path: "/geo/cities",
            name: "cities",
            beforeEnter: requireAuth,
            component: () => import("../pages/geo/Cities/Cities.vue")
        },
        {
            path: "/geo/areas",
            name: "areas",
            beforeEnter: requireAuth,
            component: () => import("../pages/geo/Areas/Areas.vue")
        },
        {
            path: "/catalog/prices",
            name: "prices",
            beforeEnter: requireAuth,
            component: () => import("../pages/catalog/Prices/Prices.vue")
        },
        {
            path: "/catalog/collection",
            name: "catalog-collection",
            component: () =>
                import("../pages/catalog/Collections/Collections.vue"),
            beforeEnter: requireAuth
        },
        {
            path: "/catalog/collection/:id",
            name: "collection-page-id",
            props: (route: Route) => {
                return {
                    id: Number(route.params.id)
                };
            },
            component: () =>
                import(
                    "../pages/catalog/CollectionEditor/CollectionEditor.vue"
                ),
            beforeEnter: requireAuth
        },

        {
            path: "/content/posts",
            name: "posts",
            props: true,
            component: () => import("../pages/content/Posts/Posts.vue"),
            beforeEnter: requireAuth
        },
        {
            path: "/content/posts/:id",
            name: "post",
            component: () =>
                import("../pages/content/PostEditor/PostEditor.vue"),
            props: (route: Route) => {
                return {
                    id: Number(route.params.id)
                };
            },
            beforeEnter: requireAuth
        },
        {
            path: "/content/categories",
            name: "content-categories",
            component: () =>
                import("../pages/content/Categories/Categories.vue"),
            beforeEnter: requireAuth
        },
        {
            path: "/content/categories/:id",
            name: "content-category-page",
            props: (route: Route) => {
                return {
                    id: Number(route.params.id)
                };
            },
            component: () =>
                import("../pages/content/CategoryEditor/CategoryEditor.vue"),
            beforeEnter: requireAuth
        },
        {
            path: "/content/tags",
            name: "content-tags",
            component: () => import("../pages/content/Tags/Tags.vue"),
            beforeEnter: requireAuth
        },
        {
            path: "/content/tags/:id",
            name: "content-tag-page",
            props: (route: Route) => {
                return {
                    id: Number(route.params.id)
                };
            },
            component: () => import("../pages/content/TagEditor/TagEditor.vue"),
            beforeEnter: requireAuth
        },
        {
            path: "/site/pages",
            name: "site-pages",
            component: () => import("../pages/site/Pages/Pages.vue"),
            beforeEnter: requireAuth
        },
        {
            path: "/site/pages/:id",
            name: "site-page-id",
            props: (route: Route) => {
                return {
                    id: Number(route.params.id)
                };
            },
            component: () => import("../pages/site/PageEditor/PageEditor.vue"),
            beforeEnter: requireAuth
        },
        {
            path: "/site/users",
            name: "site-users",
            component: () => import("../pages/site/Users/Users.vue"),
            beforeEnter: requireAuth
        },
        {
            path: "/site/users/:id",
            name: "site-user-id",
            props: (route: Route) => {
                return {
                    id: Number(route.params.id)
                };
            },
            component: () => import("../pages/site/UserEditor/UserEditor.vue"),
            beforeEnter: requireAuth
        },
        {
            path: "/site/redirect-rules",
            name: "redirect-rules",
            component: () =>
                import("../pages/site/RedirectRules/RedirectRules.vue"),
            beforeEnter: requireAuth
        },

        {
            path: "/site/settings",
            name: "settings",
            component: () => import("../pages/site/Settings/Settings.vue"),
            beforeEnter: requireAuth
        },
        {
            path: "/login",
            name: "login",
            meta: { layout: "login" },
            component: () => import("../pages/Login.vue")
        }
    ]
});
