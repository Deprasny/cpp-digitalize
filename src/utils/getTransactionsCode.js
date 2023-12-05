const getTransactionsCode = (code) => {
    if (code === "MUT") return "Mutasi";

    if (code === "PEN") return "Pensiun";

    if (code === "PROB") return "Evaluasi";

    return "";
};

export default getTransactionsCode;
