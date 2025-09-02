const MOCK_USER = "admin";
const MOCK_PASS = "123456";

export function login(user, password) {
    return user === MOCK_USER && password === MOCK_PASS;
}