import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/components/layouts/MainLayout.vue";
import AuthLayout from "@/components/layouts/AuthLayout.vue";

import LoginView from "../views/auth/LoginView.vue";
import Home from "../views/DashboardView.vue";
import Mutasi from "../views/mutasi/MutasiView.vue";
import Evaluasi from "../views/evaluasi/EvaluasiView.vue";
import Pensiun from "../views/pensiun/PensiunView.vue";

//Mutasi
import MutasiCreate from "../views/mutasi/MutasiCreateView.vue";
import MutasiCreateIndividu from "../views/mutasi/MutasiCreateIndividuView.vue";
import MutasiCreateGroup from "../views/mutasi/MutasiCreateGroupView.vue";
import MutasiDetail from "../views/mutasi/MutasiDetailView.vue";

const routes = [
    {
        path: "/",
        redirect: "/auth/login",
        component: MainLayout,
        children: [
            { path: "/dashboard", component: Home, name: "dashboard" },
            {
                path: "/mutasi",
                component: Mutasi,
                name: "mutasi",
            },
            {
                path: "/mutasi/create",
                component: MutasiCreate,
                name: "mutasi-create",
                children: [
                    {
                        path: "/mutasi/create/individu",
                        component: MutasiCreateIndividu,
                        name: "mutasi-create-individu",
                    },
                    {
                        path: "/mutasi/create/group",
                        component: MutasiCreateGroup,
                        name: "mutasi-create-group",
                    },
                ],
            },
            {
                path: "/mutasi/detail/:id",
                component: MutasiDetail,
                name: "mutasi-detail",
            },
            {
                path: "/evaluasi",
                component: Evaluasi,
                name: "evaluasi",
            },
            {
                path: "/pensiun",
                component: Pensiun,
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
