import apiService from "../utils/apiServices";

const getListResultProbation = async ({ params }) => {
    try {
        const response = await apiService.fetchData("/list_result_probation", {
            ...params,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export { getListResultProbation };
