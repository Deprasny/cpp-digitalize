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

const getMutationsDetailTable = async ({ id }) => {
    try {
        const response = await apiServices.fetchData(`/mutations/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const createMutationsTable = async ({ body }) => {
    try {
        const response = await apiServices.postData("/mutations", {
            ...body,
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export { getMutationsTable, createMutationsTable, getMutationsDetailTable };
