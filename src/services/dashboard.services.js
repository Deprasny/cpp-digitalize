import apiServices from "../utils/apiServices";

const getDashboardData = async ({ params }) => {
    try {
        const response = await apiServices.fetchData("/dashboard", {
            ...params,
        });
        return response;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export { getDashboardData };
