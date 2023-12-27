import apiServices from "../utils/apiServices";

const getListResultProbation = async ({ params }) => {
    try {
        const response = await apiServices.fetchData("/list_result_probation", {
            ...params,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const createProbations = async ({ body, config }) => {
    try {
        const response = await apiServices.postData("/probation", body, config);

        return response;
    } catch (error) {
        throw error;
    }
};

export { getListResultProbation, createProbations };
