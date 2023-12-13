import { reactive, toRefs } from "vue";

const useFetch = async ({ services, options }) => {
    const state = reactive({
        isLoading: false,
        hasError: false,
        errorMessage: "",
        data: null,
        headers: null,
    });

    const fetchData = async () => {
        state.isLoading = true;
        try {
            const response = await services?.(options);
            state.data = response?.data;
            state.headers = response?.headers;
        } catch (error) {
            state.hasError = true;
            throw error;
        } finally {
            state.isLoading = false;
        }
    };

    await fetchData();

    return {
        ...toRefs(state),
    };
};

export default useFetch;
