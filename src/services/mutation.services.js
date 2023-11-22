import apiServices from "../utils/apiServices";

const getMutationsTable = async ({ params }) => {
    try {
        const response = await apiServices.fetchData("/mutations", {
            ...params,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const createMutationsTable = async ({ params, body }) => {
    try {
        const response = await apiServices.postData("/mutations", {
            params: params,
            body: body,
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export { getMutationsTable, createMutationsTable };
