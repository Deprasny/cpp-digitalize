import { onMounted, ref, watchEffect } from "vue";

import {
  getContractTime,
  getListProbationScoreComp,
  getMaxScoreEvaluasi,
} from "../../services/evaluation.services";
import useFetchRequest from "../useFetchRequest";
import { computed } from "vue";

const useGetFormProbationVal = ({ payload }) => {
  const {
    fetchData: fetchMaxScore,
    data: maxScoreData,
    isFetching: isFetchingMaxScore,
    isError: isErrorMaxScore,
    errorMessage: errorMessageMaxScore,
  } = useFetchRequest({
    service: getMaxScoreEvaluasi,
    options: {},
  });

  const {
    fetchData: fetchContractTIme,
    data: contractTimeData,
    isFetching: isFetchingContractTime,
    isError: isErrorContractTime,
  } = useFetchRequest({
    service: getContractTime,
    options: {},
  });

  const {
    fetchData: fetchListProbationScoreComp,
    data: listProbationScoreCompData,
    isFetching: isFetchingListProbationScoreComp,
    isError: isErrorListProbationScoreComp,
  } = useFetchRequest({
    service: getListProbationScoreComp,
    options: {},
  });

  onMounted(() => {
    fetchMaxScore();
    fetchListProbationScoreComp();
  });

  watchEffect(() => {
    if (payload?.result?.value === "20") {
      fetchContractTIme();
    }
  });

  const getMaxScoreValues = (key) => {
    return maxScoreData?.value?.data?.data?.find((item) => item.key1 === key)
      ?.num1;
  };

  const getContractTimeValues = () => {
    return (
      contractTimeData?.value?.data?.map((item) => ({
        label: item.num1,
        value: item.num1,
      })) || []
    );
  };

  const getProbationScore = (data) => {
    return data?.data
      ?.filter((item) => item.key1 === "SCORE_COMP")
      .map((item) => ({
        label: Number(item.num1),
        value: Number(item.num1),
      }));
  };

  return {
    maxScoreState: {
      MAX_KPI: computed(() => getMaxScoreValues("MAX_KPI")),
      MAX_COMP: computed(() => getMaxScoreValues("MAX_COMP")),
      isFetchingMaxScore: computed(() => isFetchingMaxScore.value),
      isErrorMaxScore: computed(() => isErrorMaxScore.value),
      errorMessageMaxScore: computed(() => errorMessageMaxScore.value),
    },
    contractTimeState: {
      contractTime: computed(() => getContractTimeValues()),
      isFetchingContractTime: computed(() => isFetchingContractTime.value),
      isErrorContractTime: computed(() => isErrorContractTime.value),
    },

    listProbationScoreCompState: {
      listProbationScoreComp: computed(
        () => getProbationScore(listProbationScoreCompData?.value?.data) || []
      ),
      isFetchingListProbationScoreComp: computed(
        () => isFetchingListProbationScoreComp.value
      ),
      isErrorListProbationScoreComp: computed(
        () => isErrorListProbationScoreComp.value
      ),
    },
  };
};

export default useGetFormProbationVal;
