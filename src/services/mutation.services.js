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
        const response = await apiServices.postData(
            "/mutations",
            {
                ...body,
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

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

export {
    getMutationsTable,
    createMutationsTable,
    getMutationsDetailTable,
    putMutationsTable,
};
