import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/components/layouts/MainLayout.vue";
import AuthLayout from "@/components/layouts/AuthLayout.vue";

import LoginView from "../views/LoginView.vue";
import Home from "../views/HomeView.vue";
import Mutasi from "../views/MutasiView.vue";
import Evaluasi from "../views/EvaluasiView.vue";
import Pensiun from "../views/PensiunView.vue";

const routes = [
    {
        path: "/",
        component: MainLayout,
        children: [
            { path: "/dashboard", component: Home, name: "home" },
            {
                path: "/mutasi",
                component: Mutasi,
                name: "mutasi",
            },
            {
                path: "/evaluasi",
                component: Evaluasi,
                name: "evaluasi",
            },
            {
                path: "/pensiun",
                componentn: Pensiun,
                name: "pensiun",
            },
        ],
    },

    {
        path: "/auth",
        component: AuthLayout,
        children: [{ path: "login", component: LoginView, name: "login" }],
    },
    { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
