<template>
  <div class="mx-10">
    <div class="flex justify-between w-full mt-10 mb-5 text-start">
      <div class="flex gap-x-3">
        <p class="font-bold uppercase">PENILAIAN KOMPETENSI INTI</p>
      </div>
    </div>

    <div class="flex justify-between w-full gap-x-5">
      <div class="w-full">
        <div class="flex items-center p-3 font-semibold uppercase bg-accent-2">
          <div class="w-full h-full text-center">-</div>
          <div class="text-center w-[20%]">Score</div>
        </div>

        <div v-for="(item, index) in data" class="flex w-full" :key="i">
          <div
            class="items-center w-full p-4 border border-black min-h-[150px]"
          >
            <p class="font-semibold mb-5 text-accent-1">
              {{ item?.tprobc_comp_topic }}
            </p>

            <!-- <p class="mb-5 text-sm">{{ item?.tprobc_comp_description }}</p> -->
            <ul
              v-for="(note, index) in item.tprobc_comp_notes"
              class="ml-5 text-sm list-disc"
            >
              <li>
                {{ note }}
              </li>
            </ul>
          </div>
          <div
            class="border-l-0 p-4 border border-black w-[20%] flex items-center justify-center"
          >
            <P class="text-2xl font-bold">{{ item?.tprobc_comp_score }}</P>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end w-full my-10 font-semibold text-white">
      <div class="flex px-4 py-2 bg-accent-1 w-fit gap-x-10">
        <p>Total Score:</p>
        <p class="text-xl">{{ totalScore }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps(["isError", "errorMessage", "data", "totalScore"]);

console.log(props.data);
</script>
