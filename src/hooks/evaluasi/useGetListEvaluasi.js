import { onMounted } from "vue";
import useFetchRequest from "../../hooks/useFetchRequest";
import { getListEvaluasi } from "../../services/evaluation.services";
import { computed } from "vue";

const useGetListEvaluasi = ({ params: { jenis } }) => {
  const { data, isFetching, errorMessage, fetchData, isError } =
    useFetchRequest({
      service: getListEvaluasi,
      options: {
        params: {
          jenis,
        },
      },
    });

  onMounted(() => {
    if (jenis) fetchData();
  });

  return {
    data: computed(() => data?.value?.data),
    isFetching: computed(() => isFetching.value),
    errorMessage: computed(() => errorMessage.value),
    isError: computed(() => isError.value),
    revalidate: fetchData,
  };
};

export default useGetListEvaluasi;
