import { useVuelidate } from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";

export const getEvaluasiValidations = (values) => {
    const rules = {
        prob_score_kpi: {
            required,
            minValue: minValue(75),
        },
    };

    const validations = useVuelidate(rules, values);

    return validations;
};
