import apiServices from "../utils/apiServices";

export const getFile = async ({ body, config }) => {
  try {
    const response = await apiServices.postData(`/get_file`, body, config);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
