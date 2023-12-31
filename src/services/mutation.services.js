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

const createMutationsTable = async ({ body, config }) => {
    try {
        const response = await apiServices.postData("/mutations", body, config);

        return response;
    } catch (error) {
        throw error;
    }
};

const putMutationsTable = async ({ id, body }) => {
    try {
        const response = await apiServices.putData(`/mutations/${id}`, {
            ...body,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

const getFileDocsMutations = async ({ body, config }) => {
    try {
        const response = await apiServices.postData(`/get_file`, body, config);
        return response;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const getSKMutations = async ({ id }) => {
    try {
        const response = await apiServices.postData(`/get_sk_mutasi/${id}`);
        return response;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const getFormMutations = async ({ id }) => {
    try {
        const response = await apiServices.postData(`/get_form_mutasi/${id}`);
        return response;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export {
    getMutationsTable,
    createMutationsTable,
    getMutationsDetailTable,
    putMutationsTable,
    getFileDocsMutations,
    getSKMutations,
    getFormMutations,
};
