import auth from "../helper/auth";
require("dotenv").config();

const apiURL = process.env.API_URL + "/auth";

export default {
    async loginUser(email, password) {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...auth.getAuthHeader(),
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        };
        const response = await fetch(apiURL + "login", requestOptions);
        return await response.json();
    },
    async getUser() {
        const response = await fetch(apiURL + "me", {
            headers: auth.getAuthHeader(),
        });
        return await response.json();
    },
};
