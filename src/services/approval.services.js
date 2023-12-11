import apiServices from "../utils/apiServices";

const getMutationApprovalList = async ({ params }) => {
    try {
        const response = await apiServices.fetchData("/mutations_approve", {
            ...params,
        });
        return response;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export { getMutationApprovalList };
