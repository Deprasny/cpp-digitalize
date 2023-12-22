import { computed } from "vue";

export const allowedDates = computed(() => {
    const startYear = 2022; // You can modify this to the desired start year
    const endYear = new Date().getFullYear() + 5; // You can modify this to set the number of years into the future

    const monthsArray = [];

    for (let year = startYear; year <= endYear; year++) {
        for (let month = 0; month < 12; month++) {
            const firstDayOfMonth = new Date(year, month, 1);
            monthsArray.push(firstDayOfMonth);
        }
    }

    return monthsArray;
});
