const MOCK_USER = "admin";
const MOCK_PASS = "123";

const MOCK_USER_TESTE = "teste";
const MOCK_PASS_TESTE = "123";

const MOCK_USER_GERENTE = "ger";
const MOCK_PASS_GERENTE = "123";

const MOCK_USER_OP = "op";
const MOCK_PASS_OP = "123";

export function login(user, password) {
    if (user === MOCK_USER && password === MOCK_PASS) {
        const futureTimestamp = Math.floor(Date.now() / 1000) + 60 * 60; // +1h
        return {
            id: "1",
            name: "Administrador",
            role: "superadmin",
            exp: futureTimestamp,
            prefs: {
                theme: "light",
                pageSize: 6
            }
        };
    }

    if (user === MOCK_USER_TESTE && password === MOCK_PASS_TESTE) {
        const futureTimestamp = Math.floor(Date.now() / 1000) + 60 * 60;
        return {
            id: "2",
            name: "Usuário Teste",
            role: "admin",
            exp: futureTimestamp,
            prefs: {
                theme: "light",
                pageSize: 2
            }
        };
    }

    if (user === MOCK_USER_GERENTE && password === MOCK_PASS_GERENTE) {
        const futureTimestamp = Math.floor(Date.now() / 1000) + 60 * 60;
        return {
            id: "3",
            name: "Gerente Marcos",
            role: "manager",
            exp: futureTimestamp,
            prefs: {
                theme: "light",
                pageSize: 4
            }
        };
    }

    if (user === MOCK_USER_GERENTE && password === MOCK_PASS_GERENTE) {
        const futureTimestamp = Math.floor(Date.now() / 1000) + 60 * 60;
        return {
            id: "4",
            name: "Gerente Marcos",
            role: "manager",
            exp: futureTimestamp,
            prefs: {
                theme: "light",
                pageSize: 3
            }
        };
    }

    if (user === MOCK_USER_OP && password === MOCK_PASS_OP) {
        const futureTimestamp = Math.floor(Date.now() / 1000) + 60 * 60;
        return {
            id: "5",
            name: "Operador Claudio",
            role: "operator",
            exp: futureTimestamp,
            prefs: {
                theme: "dark",
                pageSize: 3
            }
        };
    }

    return null;
}

export function isTokenExpired(token) {
    if (!token || !token.exp) {
        return true;
    }

    const now = Math.floor(Date.now() / 1000); // agora em segundos
    return token.exp < now;
}
