import { putProbations } from "../../services/evaluation.services";
import useFetchRequest from "../useFetchRequest";
import { computed } from "vue";

const usePutProbations = ({ body, id, onSuccess, onError }) => {
    console.log("body", body);
    const { fetchData, errorMessage } = useFetchRequest({
        service: putProbations,
        options: {
            body: computed(() => body).value,
            id: id,
        },
        onSuccess: (res) => onSuccess(res),
        onError: (res) => onError(res),
    });

    const mutate = () => {
        fetchData();
    };

    return { mutate, errorMessage: computed(() => errorMessage.value) };
};

export default usePutProbations;
