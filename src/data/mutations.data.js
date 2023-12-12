const formLabelTitle = {
    Perusahaan: "Perusahaan ",
    Jabatan: "Jabatan ",
    KelasJabatan: "Kelas Jabatan ",
    BussinessUnits: "Business Units",
    CostCenter: "Cost Center ",
    LokasiKerja: "Lokasi Kerja ",
    MelaporKe: "Melapor Ke ",
    ImmediateManager: "Immediate Manager",
    Tunjangan: "Tunjangan",
};

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
        property: "muta_allow_code",
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
    muta_type: "NEW",
    muta_allow_amount: "",
    muta_allow_grossnet: "",
    muta_allow_code: "",
};

// Define props
const keluargaOptions = [
    { label: "Ikut pindah kelokasi kerja baru", value: "YES" },
    { label: "Tidak Ikut pindah kelokasi kerja baru", value: "NO" },
];

const tunjanganOptions = [
    { label: "Diambil Bulanan", value: "Monthly" },
    { label: "Diambil per 1 Tahun", value: "Yearly" },
    { label: "Diambil per 2 Tahun", value: "2 Years" },
];

const barangOptions = [
    { label: "Ambil Tunai", value: "Tunai" },
    { label: "Difasilitasi Perusahaan", value: "Perusahaan" },
];

export {
    formLabelTitle,
    statusLamaDefaultValues,
    statusBaruDefaultValues,
    tunjanganLabelTitle,
    columnTunjanganDefaultValues,
    columnTunjanganValues,
    keluargaOptions,
    tunjanganOptions,
    barangOptions,
};
