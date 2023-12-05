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

const columnTunjanganDefaultValues = [
    {
        property: "muta_type",
        type: "text",
    },
    {
        property: "muta_allow_amount",
        type: "number",
    },
    {
        property: "muta_allow_grossnet",
        type: "number",
    },
];

const columnTunjanganValues = {
    muta_type: "",
    muta_allow_amount: "",
    muta_allow_grossnet: "",
    muta_allow_code: "TRANS",
};

export {
    formLabelTitle,
    statusLamaDefaultValues,
    statusBaruDefaultValues,
    tunjanganLabelTitle,
    columnTunjanganDefaultValues,
    columnTunjanganValues,
};
