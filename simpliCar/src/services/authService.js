const MOCK_USER = "admin";
const MOCK_PASS = "123";

export function login(user, password) {
    if (user === MOCK_USER && password === MOCK_PASS) {
        const futureTimestamp = Math.floor(Date.now() / 1000) + 60 * 60; // +1h

        // Simula JWT decodificado
        return {
            id: "1435",
            name: "Axl Rose",
            role: "admin",
            exp: futureTimestamp
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
