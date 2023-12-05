const formLabelTitle = [
    "Perusahaan ",
    "Jabatan ",
    "Kelas Jabatan ",
    "Business Units",
    "Cost Center ",
    "Lokasi Kerja ",
    "Melapor Ke ",
    "Immediate Manager",
];

const statusLamaDefaultValues = ["-", "-", "-", "-", "-", "-", "-", "-"];

const tunjanganLabelTitle = ["Nama Tunjangan", "Nilai Tunjangan", "Net"];

const statusBaruDefaultValues = [
    {
        value: "",
        options: [],
        type: "dropdown",
    },
    {
        value: "",
        options: [],
        type: "dropdown",
    },
    {
        value: "",
        options: [],
        type: "text",
    },

    {
        value: "",
        options: [],
        type: "dropdown",
    },

    {
        value: "",
        options: [],
        type: "dropdown",
    },

    {
        value: "",
        options: [],
        type: "dropdown",
    },

    {
        value: "",
        options: [],
        type: "dropdown",
    },
    {
        value: "",
        options: [],
        type: "dropdown",
    },
];

export {
    formLabelTitle,
    statusLamaDefaultValues,
    statusBaruDefaultValues,
    tunjanganLabelTitle,
};
