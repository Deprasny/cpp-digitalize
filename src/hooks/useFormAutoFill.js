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
        useFetch({ services: getAllPosition, options: {} }),
        useFetch({ services: getAllBusinessUnit, options: {} }),
        useFetch({ services: getAllCostCenter, options: {} }),
        useFetch({ services: getAllWorkLocation, options: {} }),
    ]);

    const companyValues = companyResponse?.data?.value.map(
        (item) => item?.company_name
    );
    const positionValues = positionResponse?.data?.value.map(
        (item) => item?.posisi
    );
    const businessUnitValues = businessUnitsResponse?.data?.value.map(
        (item) => item?.busunit
    );
    const costCenterValues = costCenterResponse?.data?.value.map(
        (item) => item?.costcenter
    );
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