import { onMounted } from "vue";
import { getAllCompetence } from "../../services/form.services";
import useFetch from "../useFetch";
import { ref } from "vue";
import { computed } from "vue";

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

            const transformData = response.value.map((item) => {
                return {
                    title: item?.comp_topic,
                    description: item?.comp_description,
                    raw_details: { ...item },
                };
            });

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

export default useGetCompetence;
