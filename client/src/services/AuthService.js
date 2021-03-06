import auth from "../helper/auth";

const apiURL = process.env.REACT_APP_API_URL + "/auth";

export default {
    async loginUser(email, password, remember) {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...auth.getAuthHeader(),
            },
            body: JSON.stringify({
                email: email,
                password: password,
                remember: remember
            }),
        };
        const response = await fetch(apiURL + "/login", requestOptions);
        return await response.json();
    },
    async getUser() {
        const response = await fetch(apiURL + "/me", {
            headers: auth.getAuthHeader(),
        });
        return response.json();
    },
    async socialLogin(data) {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...auth.getAuthHeader(),
            },
            body: JSON.stringify(data),
        };
        const response = await fetch(apiURL + "/social", requestOptions);
        return await response.json();
    },
};
