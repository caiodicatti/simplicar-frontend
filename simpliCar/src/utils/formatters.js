export function formatCurrency(value) {
    return Number(value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    });
}

export function formatDate(value) {
    if (!value) return "";
    // Espera 'YYYY-MM-DD'
    const [year, month, day] = value.split("-");
    return `${day}/${month}/${year}`;
}

export function formatNumber(value) {
    if (value === null || value === undefined || value === "") return "";
    return Number(value).toLocaleString('pt-BR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        useGrouping: true
    });
}

export default { formatDate, formatCurrency, formatNumber };