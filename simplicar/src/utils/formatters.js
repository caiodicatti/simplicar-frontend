// Formata um valor recebido como string ou número para moeda Real Brasileira (ex: "R$ 1.000,00")
// Normaliza a entrada antes de formatar
export function formatCurrency(value) {
    if (!value) return "";

    let normalized = normalizeCurrencyInput(value).replace(',', '.');
    return Number(normalized).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    });
}

// Converte uma string de data no formato 'YYYY-MM-DD' para 'DD/MM/YYYY'
export function formatDate(value) {
    if (!value) return "";
    const [year, month, day] = value.split("-");
    return `${day}/${month}/${year}`;
}

// Formata um número para o padrão brasileiro, com separador de milhares e sem casas decimais
export function formatNumber(value) {
    if (value === null || value === undefined || value === "") return "";
    return Number(value).toLocaleString('pt-BR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        useGrouping: true
    });
}

// Normaliza o valor digitado como moeda, permitindo apenas dígitos, vírgula e ponto
// Trata diferentes separadores decimais e remove caracteres extras
export function normalizeCurrencyInput(val) {
    if (!val) return "";
    val = String(val);

    let sanitized = val.replace(/[^\d.,]/g, "");
    if (sanitized.includes('.') && sanitized.includes(',')) {
        sanitized = sanitized.replace(/\./g, '');
    }
    else if (sanitized.includes('.')) {
        sanitized = sanitized.replace('.', ',');
    }

    const parts = sanitized.split(',');
    if (parts.length > 2) sanitized = parts[0] + ',' + parts.slice(1).join('');
    return sanitized;
}

// Converte uma string formatada como moeda para valor float
// Remove símbolos de moeda e converte vírgula para ponto antes de parsear
export function parseCurrencyString(str) {
    if (!str) return 0;

    let cleaned = str.replace(/[^\d,]/g, '');
    cleaned = cleaned.replace(',', '.');

    return parseFloat(cleaned) || 0;
}

export default { formatDate, formatCurrency, formatNumber, normalizeCurrencyInput, parseCurrencyString };