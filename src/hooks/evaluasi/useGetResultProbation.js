import useFetch from "../useFetch";
import { ref, computed, onMounted } from "vue";
import { getListResultProbation } from "../../services/evaluation.services";

const useGetResultProbation = () => {
    const data = ref([]);
    const isLoading = ref(false);
    const errorMessage = ref("");

    const fetchData = async () => {
        isLoading.value = true;

        try {
            const { data: response } = await useFetch({
                services: getListResultProbation,
                options: {},
            });

            const transformData = response.value.map((item) => ({
                label: item.key2,
                value: item.num1,
            }));

            data.value = transformData;
        } catch (error) {
            errorMessage.value = error;
        } finally {
            isLoading.value = false;
        }
    };

    onMounted(() => {
        fetchData();
    });

    return {
        data: computed(() => data.value),
        isLoading: computed(() => isLoading.value),
        errorMessage: computed(() => errorMessage.value),
        fetchData,
    };
};

export default useGetResultProbation;
