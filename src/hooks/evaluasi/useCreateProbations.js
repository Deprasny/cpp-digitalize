import useFetch from "../useFetch";
import { ref, computed, onMounted } from "vue";
import { createProbations } from "../../services/evaluation.services";

const useCreateProbation = () => {
    const data = ref([]);
    const isLoading = ref(false);
    const errorMessage = ref("");

    const mutate = async ({ body, config }) => {
        isLoading.value = true;

        try {
            const { data: response } = await useFetch({
                services: createProbations,
                options: {
                    body,
                    config,
                },
            });

            data.value = response.value;
        } catch (error) {
            if (error?.response?.data?.message) {
                errorMessage.value = error?.response?.data?.message;
            } else {
                errorMessage.value = error?.message;
            }
        } finally {
            isLoading.value = false;
        }
    };

    return {
        data: computed(() => data.value),
        isLoading: computed(() => isLoading.value),
        errorMessage: computed(() => errorMessage.value),
        mutate,
    };
};

export default useCreateProbation;
