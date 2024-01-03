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

const getListEvaluasi = async ({ params }) => {
    try {
        const response = await apiServices.fetchData("/probations", {
            ...params,
        });

        return response;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const getListEvaluasiApproval = async ({ params }) => {
    try {
        const response = await apiServices.fetchData("/probations_approve", {
            ...params,
        });

        return response;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const getDetailEvaluasi = async ({ id }) => {
    try {
        const response = await apiServices.fetchData(`/probations/${id}`);

        return response;
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

const getMaxScoreEvaluasi = async () => {
    try {
        const response = await apiServices.fetchData("/probation_max_score");

        return response;
    } catch (error) {
        throw error;
    }
};

const putProbations = async ({ id, body }) => {
    try {
        const response = await apiServices.putData(`/probation/${id}`, body);

        return response.data;
    } catch (error) {
        throw error;
    }
};

const getContractTime = async () => {
    try {
        const response = await apiServices.fetchData(
            "/probation_contract_time"
        );

        return response;
    } catch (error) {
        throw error;
    }
};

export {
    getListResultProbation,
    createProbations,
    getMaxScoreEvaluasi,
    getContractTime,
    getListEvaluasi,
    getDetailEvaluasi,
    getListEvaluasiApproval,
    putProbations,
};
