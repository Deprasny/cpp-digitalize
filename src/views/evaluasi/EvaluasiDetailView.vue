<template>
  <div>
    <a @click="$router.back()">
      <UIButton :icon="IconChevronLeft" :variant="'secondary'"> Back </UIButton>
    </a>

    <UIDivider />

    <div class="flex justify-center w-full p-10" v-if="isFetching">
      <UILoader />
    </div>

    <div class="flex my-16" v-else>
      <BasicCard :title="data?.prob_req_no" variant="detail" class="w-[95%]">
        <DetailWrapper>
          <div class="flex w-full">
            <LabelForm label="Nama & NIK">
              <div class="flex gap-4">
                <p class="w-auto">
                  {{ data?.prob_name }} - {{ data?.prob_nik }}
                </p>

                <DownloadFiles
                  label="Download SK"
                  v-if="data?.prob_sk_no"
                  :options="getUrlBody(data?.prob_file_sk)"
                  :services="getFile"
                  :fileName="`${data?.prob_sk_no}-sk`"
                />
              </div>
            </LabelForm>
          </div>
          <div class="flex w-full">
            <LabelForm label="Usia"
              ><p class="w-full">{{ data?.prob_age }} Tahun</p>
            </LabelForm>
          </div>

          <div class="flex w-full">
            <LabelForm label="Jabatan">
              <p class="w-full">
                {{ data?.prob_position }}
              </p>
            </LabelForm>
          </div>
          <div class="flex w-full">
            <LabelForm label="Level">
              <p class="w-full">
                {{ data?.prob_level }}
              </p></LabelForm
            >
          </div>

          <div class="flex w-full">
            <LabelForm label="Divisi/Department">
              <p class="w-full">
                {{ data?.prob_division }}
              </p></LabelForm
            >
          </div>

          <div class="flex w-full">
            <LabelForm label="Tanggal Masuk">
              <p class="w-full">
                {{ data?.prob_joint_date }}
              </p></LabelForm
            >
          </div>

          <div class="flex w-full">
            <LabelForm label="Periode">
              <p class="w-full">
                {{ data?.prob_start_date1 }} -
                {{ data?.prob_end_date1 }}
              </p></LabelForm
            >
          </div>
        </DetailWrapper>

        <UIDivider />

        <!-- form penilaian -->

        <DetailWrapper>
          <FormTablePencapaian :data="data?.kpi" formAction="detail" />
        </DetailWrapper>

        <UIDivider />

        <!-- form PENILAIAN KOMPETENSI INTI -->
        <FormKompetensiDetail
          :data="data?.comp"
          :total-score="data?.prob_score_comp"
        />

        <UIDivider />

        <!-- form akhir  -->
        <div class="flex items-start justify-between w-full mx-10 my-10">
          <div class="flex flex-col items-start gap-y-5">
            <div class="flex items-center justify-between gap-x-5">
              <p class="font-semibold">PENILAIAN AKHIR (GRAND TOTAL SCORE)</p>
              <div class="flex px-4 py-2 bg-accent-1 w-fit gap-x-10">
                <p class="text-xl font-semibold text-white">
                  {{ data?.prob_score_final || 0 }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-x-5">
              <LabelForm label="Pengajuan Status">
                <p class="text-accent-1">
                  {{ data?.prob_result_text }}
                </p>
              </LabelForm>
            </div>
            <div class="flex max-w-[800px]">
              <LabelForm label="Catatan">
                <ul>
                  <li class="w-full" v-for="note in data?.prob_final_note">
                    {{ note }}
                  </li>
                </ul>
              </LabelForm>
            </div>
          </div>
        </div>

        <RouterView :data="data" />
      </BasicCard>

      <!-- status log -->
      <Log :data="progressData" />
    </div>
  </div>

  <Modal
    v-if="isError"
    :isModalOpen="isError"
    @toggleModal="$router.back()"
    modalTitle="Terjadi Kesalahan Saat Mengambil Data"
    modalType="danger"
  />
</template>

<script setup>
import { ref, watch, watchEffect } from "vue";
import UIButton from "@/components/ui/UIButton.vue";
import IconChevronLeft from "@/components/icons/IconChevronLeft.vue";
import UIDivider from "@/components/ui/UIDivider.vue";
import BasicCard from "../../components/BasicCard.vue";
import LabelForm from "../../components/LabelForm.vue";
import Log from "../../components/Log.vue";
import useGetDetailEvaluasi from "../../hooks/evaluasi/useGetDetailEvaluasi";

import DetailWrapper from "../../components/evaluasi/wrapper/DetailWrapper.vue";
import FormTablePencapaian from "../../components/evaluasi/formPencapaian/FormTablePencapaian.vue";
import { RouterView, useRouter } from "vue-router";
import UILoader from "../../components/ui/UILoader.vue";
import Modal from "../../components/Modal.vue";
import FormKompetensiDetail from "../../components/evaluasi/formKompetensi/FormKompetensiDetail.vue";
import DownloadFiles from "../../components/DownloadFiles.vue";
import { getFile } from "../../services/common.services";

const router = useRouter();

const id = router.currentRoute.value.params.id;

const { data, isFetching, progressData, isError } = useGetDetailEvaluasi({
  id: id,
});

const getUrlBody = (url) => {
  return {
    body: {
      url: url,
    },
  };
};
watchEffect(() => {
  console.log(data?.value);
});
</script>
