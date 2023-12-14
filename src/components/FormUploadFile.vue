<template>
    <div>
        <input
            type="file"
            ref="fileInput"
            @change="handleFileUpload"
            style="display: none"
            accept="application/pdf"
        />

        <div v-if="modelValue && modelValue.length > 0" class="mt-4">
            <ul class="list-none p-0">
                <li
                    v-for="(file, index) in modelValue"
                    :key="index"
                    class="p-2 rounded flex gap-2 items-center"
                >
                    <component :is="IconFile" class="text-lg text-accent-1" />
                    <p class="text-sm">{{ file.name }}</p>
                    <button
                        @click="deleteFile(index)"
                        class="text-red-500 hover:text-red-700"
                    >
                        <component
                            :is="IconClose"
                            class="text-lg text-accent-1"
                        />
                    </button>
                </li>
            </ul>
        </div>

        <div v-else>
            <UIButton
                variant="form"
                class="w-[200px]"
                type="file"
                @click="triggerFileInput"
            >
                Upload File
            </UIButton>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, toRefs } from "vue";
import UIButton from "./ui/UIButton.vue";
import IconFile from "./icons/IconFile.vue";
import IconClose from "./icons/IconClose.vue";

let { modelValue } = defineProps(["modelValue"]);

const emit = defineEmits(["update:modelValue"]);

const triggerFileInput = () => {
    fileInput?.value?.click();
};

const handleFileUpload = (event) => {
    const files = event.target.files;

    if (!modelValue) {
        modelValue = [];
    }

    modelValue.length = 0;
    for (let i = 0; i < files.length; i++) {
        modelValue.push(files[i]);
    }

    emit("update:modelValue", modelValue);
};

const deleteFile = (index) => {
    modelValue.splice(index, 1);
    // Emit the updated modelValue using v-model
    emit("update:modelValue", modelValue);
};

const fileInput = ref(null);
</script>
