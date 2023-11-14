/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "accent-1": "#D2A92A",
                "accent-2": "#EFD995",
            },
            backgroundImage: {
                background:
                    "linear-gradient(188deg, rgba(0, 0, 0, 0.77) 6.99%, rgba(0, 0, 0, 0.43) 77.25%)",
                line: "linear-gradient(90deg, #D2A92A 0%, rgba(217, 217, 217, 0.00) 101.22%)",
                button: "linear-gradient(180deg, #AFE2FF 0%, #0A70A9 100%)",
            },
            backgroundColor: {
                buttonLogin: "rgba(255, 255, 255, 0.25)",
                content: "#F6FAFF",
            },
        },
    },
    plugins: [],
};
