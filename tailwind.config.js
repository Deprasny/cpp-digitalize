/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                background:
                    "linear-gradient(188deg, rgba(0, 0, 0, 0.77) 6.99%, rgba(0, 0, 0, 0.43) 77.25%)",
            },
            backgroundColor: {
                buttonLogin: "rgba(255, 255, 255, 0.25)",
            },
        },
    },
    plugins: [],
};
