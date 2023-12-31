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
import EvaluasiProbation from "../views/evaluasi/EvaluasiProbationView.vue";
import EvaluasiDefaultDetail from "../views/evaluasi/EvaluasiDefaultDetailView.vue";
import EvaluasiDetailApproval from "../views/evaluasi/EvaluasiDetailApproval.vue";

//Pensiun
import Pensiun from "../views/pensiun/PensiunView.vue";
import PensiunCreate from "../views/pensiun/PensiunCreateView.vue";
import PensiunDetail from "../views/pensiun/PensiunDetailView.vue";

//Approval
import Approval from "../views/approval/ApprovalView.vue";
import ApprovalMutasi from "../views/approval/ApprovalMutasiView.vue";
import ApprovalEvaluasi from "../views/approval/ApprovalEvaluasiView.vue";
import ApprovalPensiun from "../views/approval/ApprovalPensiunView.vue";

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
                children: [
                    {
                        path: "/evaluasi/probation",
                        component: EvaluasiProbation,
                        name: "evaluasi-probation",
                    },
                ],
            },
            {
                path: "/evaluasi/create",
                component: EvaluasiCreate,
                name: "evaluasi-create",
            },
            {
                path: "/evaluasi/:id",
                component: EvaluasiDetail,
                name: "evaluasi-details",
                children: [
                    {
                        path: "/evaluasi/:id/approval",
                        name: "evaluasi-detail-approval",
                        component: EvaluasiDetailApproval,
                    },

                    {
                        path: "/evaluasi/:id/detail",
                        name: "evaluasi-detail",
                        component: EvaluasiDefaultDetail,
                    },
                ],
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
            {
                path: "/pensiun/detail/:id",
                component: PensiunDetail,
                name: "pensiun-detail",
            },
            {
                path: "/approval",
                component: Approval,
                name: "approval",
                children: [
                    {
                        path: "/approval/mutasi",
                        component: ApprovalMutasi,
                        name: "approval-mutasi",
                    },
                    {
                        path: "/approval/evaluasi",
                        component: ApprovalEvaluasi,
                        name: "approval-evaluasi",
                    },
                    {
                        path: "/approval/pensiun",
                        component: ApprovalPensiun,
                        name: "approval-pensiun",
                    },
                ],
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
