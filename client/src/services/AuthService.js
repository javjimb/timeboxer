import auth from "../helper/auth";

const apiURL = "http://localhost:5000/auth/login";

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
        const response = await fetch(apiURL, requestOptions);
        return await response.json();
    },
};
