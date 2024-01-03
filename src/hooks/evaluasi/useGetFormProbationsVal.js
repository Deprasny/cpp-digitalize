import { onMounted, ref, watchEffect } from "vue";

import {
    getContractTime,
    getMaxScoreEvaluasi,
} from "../../services/evaluation.services";
import useFetchRequest from "../useFetchRequest";
import { computed } from "vue";

const useGetFormProbationVal = ({ payload }) => {
    const {
        fetchData: fetchMaxScore,
        data: maxScoreData,
        isFetching: isFetchingMaxScore,
        isError: isErrorMaxScore,
        errorMessage: errorMessageMaxScore,
    } = useFetchRequest({
        service: getMaxScoreEvaluasi,
        options: {},
    });

    const {
        fetchData: fetchContractTIme,
        data: contractTimeData,
        isFetching: isFetchingContractTime,
        isError: isErrorContractTime,
    } = useFetchRequest({
        service: getContractTime,
        options: {},
    });

    onMounted(() => {
        fetchMaxScore();
    });

    watchEffect(() => {
        if (payload?.result?.value === "20") {
            fetchContractTIme();
        }
    });

    const getMaxScoreValues = (key) => {
        return maxScoreData?.value?.data?.data?.find(
            (item) => item.key1 === key
        )?.num1;
    };

    const getContractTimeValues = () => {
        return (
            contractTimeData?.value?.data?.map((item) => ({
                label: item.num1,
                value: item.num1,
            })) || []
        );
    };

    return {
        maxScoreState: {
            MAX_KPI: computed(() => getMaxScoreValues("MAX_KPI")),
            MAX_COMP: computed(() => getMaxScoreValues("MAX_COMP")),
            isFetchingMaxScore: computed(() => isFetchingMaxScore.value),
            isErrorMaxScore: computed(() => isErrorMaxScore.value),
            errorMessageMaxScore: computed(() => errorMessageMaxScore.value),
        },
        contractTimeState: {
            contractTime: computed(() => getContractTimeValues()),
            isFetchingContractTime: computed(
                () => isFetchingContractTime.value
            ),
            isErrorContractTime: computed(() => isErrorContractTime.value),
        },
    };
};

export default useGetFormProbationVal;
