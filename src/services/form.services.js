import apiServices from "../utils/apiServices";

const getEmployeeByUser = async ({ params }) => {
    try {
        const response = await apiServices.fetchData("/employeeByUser", {
            ...params,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export { getEmployeeByUser };
