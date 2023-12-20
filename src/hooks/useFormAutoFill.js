import {
    getAllBusinessUnit,
    getAllCompany,
    getAllCostCenter,
    getAllPosition,
    getAllWorkLocation,
    getDirectSpv,
} from "../services/form.services";
import useFetch from "./useFetch";

const useFormAutoFill = async () => {
    const [
        companyResponse,
        positionResponse,
        businessUnitsResponse,
        costCenterResponse,
        workLocationResponse,
    ] = await Promise.all([
        useFetch({ services: getAllCompany, options: {} }),
        useFetch({
            services: getAllPosition,
            options: {
                params: { page: 1, limit: 999, cari: "" },
            },
        }),
        useFetch({ services: getAllBusinessUnit, options: {} }),
        useFetch({ services: getAllCostCenter, options: {} }),
        useFetch({ services: getAllWorkLocation, options: {} }),
    ]);

    const companyValues = companyResponse?.data?.value.map((item) => {
        return {
            label: `${item?.company_id} - ${item?.company_name}`,
            value: `${item?.company_id} - ${item?.company_name}`,
        };
    });
    const positionValues = positionResponse?.data?.value.map((item) => {
        return {
            label: item?.position_name,
            value: `${item?.position_code}-${item?.position_name}`,
        };
    });
    const businessUnitValues = businessUnitsResponse?.data?.value.map(
        (item) => {
            return {
                label: item?.division_name,
                value: item?.division_name,
            };
        }
    );
    const costCenterValues = costCenterResponse?.data?.value.map((item) => {
        return {
            label: item?.dept_name,
            value: `${item?.dept_id} ${item?.division_id} ${item?.dept_name}`,
        };
    });
    const workLocationValues = workLocationResponse?.data?.value.map((item) => {
        return {
            label: item?.worklocation_name,
            value: item?.worklocation_code,
        };
    });

    return {
        companyValues,
        positionValues,
        businessUnitValues,
        costCenterValues,
        workLocationValues,
    };
};

export default useFormAutoFill;
