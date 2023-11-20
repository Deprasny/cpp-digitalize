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

export { getMutationsTable };
