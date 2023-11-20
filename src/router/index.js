import { createRouter, createWebHistory } from "vue-router";

//layouts
import MainLayout from "@/components/layouts/MainLayout.vue";
import AuthLayout from "@/components/layouts/AuthLayout.vue";

import LoginView from "../views/auth/LoginView.vue";
import Dashboard from "../views/DashboardView.vue";

//Mutasi
import Mutasi from "../views/mutasi/MutasiView.vue";
import MutasiCreate from "../views/mutasi/MutasiCreateView.vue";
import MutasiCreateIndividu from "../views/mutasi/MutasiCreateIndividuView.vue";
import MutasiCreateGroup from "../views/mutasi/MutasiCreateGroupView.vue";
import MutasiDetail from "../views/mutasi/MutasiDetailView.vue";

//Evaluasi
import Evaluasi from "../views/evaluasi/EvaluasiView.vue";
import EvaluasiCreate from "../views/evaluasi/EvaluasiCreateView.vue";
import EvaluasiDetail from "../views/evaluasi/EvaluasiDetailView.vue";

//Pensiun
import Pensiun from "../views/pensiun/PensiunView.vue";
import PensiunCreate from "../views/pensiun/PensiunCreateView.vue";

const routes = [
    {
        path: "/",
        redirect: "/auth/login",
        component: MainLayout,
        children: [
            { path: "/dashboard", component: Dashboard, name: "dashboard" },
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
                path: "/evaluasi/create",
                component: EvaluasiCreate,
                name: "evaluasi-create",
            },
            {
                path: "/evaluasi/detail/:id",
                component: EvaluasiDetail,
                name: "evaluasi-detail",
            },
            {
                path: "/pensiun",
                component: Pensiun,
                name: "pensiun",
            },
            {
                path: "/pensiun/create",
                component: PensiunCreate,
                name: "pensiun-create",
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
