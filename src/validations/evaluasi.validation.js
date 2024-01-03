import { useVuelidate } from "@vuelidate/core";
import { required, minValue, helpers, maxValue } from "@vuelidate/validators";
import { ref } from "vue";
import { watchEffect } from "vue";

export const getEvaluasiValidations = ({
    values,

    maxScoreState,
}) => {
    const maxScoreKPI = ref(maxScoreState?.MAX_KPI?.value);
    const maxScoreComp = ref(maxScoreState?.MAX_COMP?.value);

    watchEffect(() => {
        maxScoreKPI.value = maxScoreState?.MAX_KPI?.value;
        maxScoreComp.value = maxScoreState?.MAX_COMP?.value;
    });

    const rules = {
        prob_score_kpi: {
            required: helpers.withMessage(
                "Nilai Pencapaian Target KPI Tidak Boleh Kosong",
                required
            ),
            maxValue: helpers.withMessage(
                "Nilai Pencapaian Target KPI Melebihi Nilai Target KPI",
                maxValue(maxScoreKPI)
            ),
        },
        prob_score_comp: {
            required: helpers.withMessage(
                "Nilai Pencapaian Target Kompetensi Tidak Boleh Kosong",
                required
            ),
            maxValue: helpers.withMessage(
                "Nilai Pencapaian Target Kompetensi Melebihi Nilai Target Kompetensi",
                maxValue(maxScoreComp)
            ),
        },
    };

    const validations = useVuelidate(rules, values);

    return validations;
};
