import { putProbations } from "../../services/evaluation.services";
import useFetchRequest from "../useFetchRequest";
import { computed } from "vue";

const usePutProbations = ({ onSuccess, onError }) => {
    const { mutate, errorMessage, isFetching } = useFetchRequest({
        service: putProbations,
        options: {},
        onSuccess: (res) => onSuccess(res),
        onError: (res) => onError(res),
    });

    return {
        mutate,
        errorMessage: computed(
            () => errorMessage.value?.response?.data?.message
        ),
        isFetching: computed(() => isFetching.value),
    };
};

export default usePutProbations;
