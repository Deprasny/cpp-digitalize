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
