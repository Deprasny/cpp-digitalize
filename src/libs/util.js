export function createGradient(color1, color2) {
    const ctx = document.createElement("canvas").getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
}
