function formatRupiah(amount) {
    try {
        // Convert the amount to a float if it's not already
        amount = parseFloat(amount);

        // Check if the conversion is successful
        if (isNaN(amount)) {
            throw new Error(
                "Invalid input. Please provide a valid numeric value."
            );
        }

        // Format the amount as Rupiah with thousands separator and two decimal places
        const formattedAmount = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(amount);

        return formattedAmount;
    } catch (error) {
        return error.message;
    }
}

export default formatRupiah;
