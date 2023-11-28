export function createGradient(color1, color2) {
    const ctx = document.createElement("canvas").getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
}

export function getFormattedDate(currentDate) {
    var formattedDate =
        (currentDate.getMonth() + 1).toString().padStart(2, "0") +
        "/" +
        currentDate.getDate().toString().padStart(2, "0") +
        "/" +
        currentDate.getFullYear();

    return formattedDate;
}

import { ref, onBeforeUnmount } from "vue";

export const useCurrentTime = () => {
    const currentTime = ref(new Date().toLocaleString());
    const updateCurrentTime = () => {
        const options = {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        };
        const formattedTime = new Date()
            .toLocaleString("id-ID", options)
            .replace(/\./g, ":");

        currentTime.value = `${formattedTime.slice(
            0,
            -14
        )} | ${formattedTime.slice(-8)}`;
    };

    const updateTimeInterval = setInterval(updateCurrentTime, 1000);

    onBeforeUnmount(() => {
        clearInterval(updateTimeInterval);
    });

    return {
        currentTime: currentTime,
    };
};
