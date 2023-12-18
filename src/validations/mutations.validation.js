import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export const getMutationsGroupValidations = (values) => {
    const rules = {
        mut_date: {
            required,
        },
        mut_reason: {
            required,
        },
    };

    const validations = useVuelidate(rules, values);

    return validations;
};

export const getMutationsValidations = (values) => {
    const rules = {
        mut_date: {
            required,
        },
        mut_reason: {
            required,
        },
    };

    const validations = useVuelidate(rules, values);

    return {
        ...validations,
    };
};
