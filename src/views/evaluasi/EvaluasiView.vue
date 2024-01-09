<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex items-center justify-between w-full my-5">
      <UIButton
        @click="$router.back()"
        :icon="IconChevronLeft"
        :variant="'secondary'"
        >Evaluasi
      </UIButton>
      <router-link to="/evaluasi/create">
        <UIButton :icon="IconPlus">Buat form evaluasi baru </UIButton>
      </router-link>
    </div>
    <div
      class="flex justify-start w-full md:-mb-6 gap-x-4 text-[#0A70A9] text-xl ml-0 md:ml-10"
    >
      <UIButton
        :variant="tab.path === currentPath ? 'tab-active' : 'tab'"
        v-for="tab in tabs"
        @click="$router.push({ name: tab.path })"
      >
        <div class="flex gap-2 text-sm md:gap-x-16 md:text-base">
          <span>{{ tab.label }}</span>
          <span>{{ tab.length }}</span>
        </div></UIButton
      >
    </div>

    <RouterView />
  </div>
</template>

<script setup>
import UIButton from "@/components/ui/UIButton.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import IconChevronLeft from "@/components/icons/IconChevronLeft.vue";
import { RouterView, useRouter } from "vue-router";
import { ref, watch, watchEffect, computed } from "vue";

const router = useRouter();

const currentPath = computed(() => router.currentRoute.value.name);

const tabs = ref([
  {
    label: "Kontrak",
    path: "evaluasi-kontrak",
    name: "kontrak",
    length: 0,
  },
  {
    label: "Probation",
    path: "evaluasi-probation",
    name: "probation",
    length: 0,
  },
]);
</script>
