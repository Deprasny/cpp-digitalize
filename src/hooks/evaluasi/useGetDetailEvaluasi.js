import { onMounted } from "vue";
import { getDetailEvaluasi } from "../../services/evaluation.services";
import useFetchRequest from "../useFetchRequest";
import { computed } from "vue";

const useGetDetailEvaluation = ({ id }) => {
    const { data, errorMessage, fetchData, isError, isFetching } =
        useFetchRequest({
            service: getDetailEvaluasi,
            options: { id: id },
        });

    onMounted(() => {
        if (id) fetchData();
    });

    const transformDataToDetail = (value) => {
        const parseStringToJson = (val) => {
            return val ? JSON.parse(val) : "";
        };

        const parseStringToNumber = (val) => {
            return val ? Number(val) : 0;
        };

        const newVal = {
            ...value,
            prob_final_note: parseStringToJson(value?.prob_final_note),
            kpi:
                {
                    target: value?.kpi?.map((item) => ({
                        details: { ...item },
                        inputLabel: item?.probt_kpi,
                        inputVal: parseStringToNumber(item?.probt_kpi_score),
                    })),

                    actual: value?.kpi?.map((item) => ({
                        details: { ...item },
                        inputLabel: item?.probt_actual,
                        inputVal: parseStringToNumber(item?.probt_actual_score),
                    })),
                } || [],
        };

        return newVal;
    };

    const transformProgressToDetail = (value) => {
        return value?.map((item) => ({
            details: { ...item },
            date: item?.docstep_status,
            description: item?.step_description,
        }));
    };

    return {
        data: computed(() => transformDataToDetail(data.value?.data?.data)),
        progressData: computed(() =>
            transformProgressToDetail(data.value?.data?.progress)
        ),
        errorMessage: computed(() => errorMessage.value),
        isError: computed(() => isError.value),
        isFetching: computed(() => isFetching.value),
        revalidate: fetchData,
    };
};

export default useGetDetailEvaluation;
