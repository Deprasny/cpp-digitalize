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

const getAllCompany = async ({ params }) => {
  try {
    const response = await apiServices.fetchData("/company", {
      ...params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getAllPosition = async ({ params }) => {
  try {
    const response = await apiServices.fetchData("/position", {
      ...params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getAllBusinessUnit = async ({ params }) => {
  try {
    const response = await apiServices.fetchData("/bu", {
      ...params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getAllCostCenter = async ({ params }) => {
  try {
    const response = await apiServices.fetchData("/costcenter", {
      ...params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getAllWorkLocation = async ({ params }) => {
  try {
    const response = await apiServices.fetchData("/work_location", {
      ...params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getDirectSpv = async ({ params }) => {
  try {
    const response = await apiServices.fetchData("/directSpv", {
      ...params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getImmediateManager = async ({ params }) => {
  try {
    const response = await apiServices.fetchData("/immedMgr", {
      ...params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getAllowance = async ({ params }) => {
  try {
    const response = await apiServices.fetchData("/m_allowance", {
      ...params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getAllCompetence = async ({ params }) => {
  try {
    const response = await apiServices.fetchData("/m_competence", {
      ...params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getEmployyeeByProb = async ({ params }) => {
  try {
    const response = await apiServices.fetchData("/employeeByUserProb", {
      ...params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getEmployeByEvalContract = async () => {
  try {
    const response = await apiServices.fetchData("/employeeByUserProb", {
      type: "CONTRACT",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getEmployeeByEvalProb = async () => {
  try {
    const response = await apiServices.fetchData("/employeeByUserProb", {
      type: "PROBATION",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export {
  getEmployeeByUser,
  getAllCompany,
  getAllPosition,
  getAllBusinessUnit,
  getAllCostCenter,
  getAllWorkLocation,
  getDirectSpv,
  getImmediateManager,
  getAllowance,
  getAllCompetence,
  getEmployyeeByProb,
  getEmployeeByEvalProb,
  getEmployeByEvalContract,
};
