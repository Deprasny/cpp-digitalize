import { useVuelidate } from "@vuelidate/core";
import { required, minValue, helpers, maxValue } from "@vuelidate/validators";

export const getEvaluasiValidations = ({
    values,
    max_prob_score_kpi,
    max_prob_score_comp,
}) => {
    const rules = {
        prob_score_kpi: {
            required: helpers.withMessage(
                "Nilai Pencapaian Target KPI Tidak Boleh Kosong",
                required
            ),
            maxValue: helpers.withMessage(
                "Nilai Pencapaian Target KPI Melebihi Nilai Target KPI",
                maxValue(max_prob_score_kpi)
            ),
        },
        prob_score_comp: {
            required: helpers.withMessage(
                "Nilai Pencapaian Target Kompetensi Tidak Boleh Kosong",
                required
            ),
            maxValue: helpers.withMessage(
                "Nilai Pencapaian Target Kompetensi Melebihi Nilai Target Kompetensi",
                maxValue(max_prob_score_comp)
            ),
        },
    };

    const validations = useVuelidate(rules, values);

    return validations;
};
