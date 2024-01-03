import { callWithAsyncErrorHandling, computed } from "vue";
import { ref } from "vue";

const useFetchRequest = ({
    service,
    options: { params, body, config, id },
    onSuccess,
    onError,
}) => {
    const value = ref({
        data: {},
        isFetching: false,
        isError: false,
        errorMessage: "",
    });

    const fetchData = async () => {
        value.value.isFetching = true;
        try {
            const response = await service?.({ params, body, config, id });

            value.value.data = response?.data;
            onSuccess && onSuccess(response?.data);
        } catch (error) {
            onError && onError(error);
            value.value.isError = true;
            value.value.errorMessage = error;
        } finally {
            value.value.isFetching = false;
        }
    };

    const mutate = async ({ params, body, config, id }) => {
        value.value.isFetching = true;
        try {
            const response = await service?.({ params, body, config, id });

            value.value.data = response?.data;
            onSuccess && onSuccess(response?.data);
        } catch (error) {
            onError && onError(error);
            value.value.isError = true;
            value.value.errorMessage = error;
        } finally {
            value.value.isFetching = false;
        }
    };

    return {
        mutate,
        fetchData,
        data: computed(() => value.value),
        isFetching: computed(() => value.value.isFetching),
        isError: computed(() => value.value.isError),
        errorMessage: computed(() => value.value.errorMessage),
    };
};

export default useFetchRequest;
