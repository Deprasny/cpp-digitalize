import { onMounted } from "vue";
import { getAllCompetence } from "../../services/form.services";
import useFetch from "../useFetch";
import { ref } from "vue";

const useGetCompetence = () => {
    const data = ref([]);
    const isLoading = ref(false);
    const errorMessage = ref("");

    const fetchData = async () => {
        isLoading.value = true;

        try {
            const { data: response } = await useFetch({
                services: getAllCompetence,
                options: {
                    params: {
                        limit: 10,
                        page: 1,
                    },
                },
            });

            data.value = response.value;
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
        data: data.value,
        isLoading: isLoading.value,
        errorMessage: errorMessage.value,
        fetchData,
    };
};

export default useGetCompetence;
