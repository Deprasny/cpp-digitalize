<template>
    <div
        class="flex items-center justify-between min-h-screen bg-center bg-cover"
    >
        <div
            class="flex-col justify-center hidden max-w-md px-5 pl-20 gap-y-40 md:flex"
        >
            <div class="flex mt-5">
                <img src="@/assets/image/logo.svg" alt="" />
            </div>
            <div class="flex flex-col mt-15">
                <h1 class="mb-5 heading">HR Digitalize Document</h1>
                <p class="description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                </p>
            </div>
            <div class="flex mt-5">
                <p class="text-white">Maintain & Develop by CP Prima</p>
            </div>
        </div>
        <div
            class="h-screen p-4 bg-background shadow-md md:w-[450px] w-full backdrop-blur-sm"
        >
            <div class="flex flex-col px-1 mt-20 sm:px-5 gap-y-5">
                <div class="mb-5">
                    <h1 class="mb-5 text-white">LOG IN</h1>
                    <p class="description">
                        Mohon login menggunakan email @cpp.co.id Anda yang sudah
                        terdaftar
                    </p>
                </div>
                <form
                    @submit.prevent="login"
                    class="flex flex-col items-center justify-center"
                >
                    <form-input
                        id="email"
                        label="Email"
                        type="text"
                        v-model="email"
                        :icon="mailIcon"
                        variant="auth"
                    />
                    <form-input
                        id="password"
                        label="Password"
                        :type="showPassword ? 'text' : 'password'"
                        v-model="password"
                        :icon="showPassword ? eyeIcon : eyeSlashIcon"
                        @toggleIcon="togglePasswordVisibility"
                        variant="auth"
                    />
                    <UIButton variant="login">
                        <span class="description">
                            {{ isLoading ? "Logging In..." : "LOGIN" }}
                        </span>
                    </UIButton>
                    <p class="description">atau</p>
                    <UIButton variant="loginGoogle">
                        <div class="flex items-center justify-center">
                            <img :src="googleIcon" class="w-8 h-8 pr-3" />Masuk
                            Dengan Google
                        </div>
                    </UIButton>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import FormInput from "@/components/FormInput.vue";
import UIButton from "@/components/ui/UIButton.vue";

//icon
import mailIcon from "@/assets/icons/mail.svg";
import eyeSlashIcon from "@/assets/icons/eye-slash.svg";
import eyeIcon from "@/assets/icons/eye.svg";
import googleIcon from "@/assets/icons/google.svg";

const router = useRouter();

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const isLoading = ref(false);

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const login = async () => {
    isLoading.value = true;
    try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        localStorage.setItem("user_email", email.value);

        router.push({ name: "dashboard" });
    } catch (err) {
        console.error("Login error:", err.message);
    } finally {
        isLoading.value = false;
    }
};
</script>

<style scoped>
.bg-cover {
    background-image: url("@/assets/image/background.jpg");
}
</style>
