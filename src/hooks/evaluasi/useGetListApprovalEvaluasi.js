import { computed, onMounted } from "vue";
import { getListEvaluasiApproval } from "../../services/evaluation.services";
import useFetchRequest from "../useFetchRequest";

const useGetlistApprovalEvaluasi = ({ onError }) => {
    const { data, errorMessage, fetchData, isError, isFetching } =
        useFetchRequest({
            service: getListEvaluasiApproval,
            options: {},
            onError: (res) => onError(res),
        });

    onMounted(() => {
        fetchData();
    });

    return {
        data: computed(() => data.value?.data?.data),
        errorMessage: computed(() => errorMessage.value),
        revalidate: fetchData,
        isError: computed(() => isError.value),
        isFetching: computed(() => isFetching.value),
    };
};

export default useGetlistApprovalEvaluasi;
