export const getFirstChars = (str: string, length: number) => {
    if (str?.length <= length) {
        return str;
    }
    return str?.substring(0, length).toLocaleLowerCase();
}

export const convertCurrency = (amount: number, rate: number) => {
    const convertedAmount = amount * rate;
    return Math.round(convertedAmount * 100) / 100; // Làm tròn đến 2 chữ số thập phân
};

export const convertJsonToObject = (data: { [key: string]: any }) => {
    const exchange_rates: { [key: string]: { [key: string]: any } } = {};
    const currencies = Object.keys(data);

    for (const base of currencies) {
        exchange_rates[base.toLowerCase()] = {};
        for (const target of currencies) {
            if (base !== target) {
                exchange_rates[base.toLowerCase()][target.toLowerCase()] = data[target] / data[base];
            }
        }
    }
}