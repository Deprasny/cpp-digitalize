import { computed } from "vue";
import { ref } from "vue";

const useFetchRequest = ({ service, options: { params, body, config } }) => {
    const value = ref({
        data: {},
        isFetching: false,
        isError: false,
        errorMessage: "",
    });

    const fetchData = async () => {
        value.value.isFetching = true;
        try {
            const response = await service?.({ params, body, config });

            value.value.data = response?.data;
        } catch (error) {
            value.value.isError = true;
            value.value.errorMessage = error;
        } finally {
            value.value.isFetching = false;
        }
    };

    return {
        fetchData,
        data: computed(() => value.value.data),
        isFetching: computed(() => value.value.isFetching),
        isError: computed(() => value.value.isError),
        errorMessage: computed(() => value.value.errorMessage),
    };
};

export default useFetchRequest;
