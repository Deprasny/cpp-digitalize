import { reactive, toRefs } from "vue";

const useFetch = async ({ services, options }) => {
    const state = reactive({
        isLoading: false,
        hasError: false,
        errorMessage: "",
        data: null,
    });

    const fetchData = async () => {
        state.isLoading = true;
        try {
            const response = await services(options);
            state.data = response;
        } catch (error) {
            state.hasError = true;
            state.errorMessage = error.message;
            console.error(error);
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
