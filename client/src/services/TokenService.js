require("dotenv").config();

const apiURL = process.env.REACT_APP_API_URL + "/tokens/";

export default {
    async verifyUser(token, email) {
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: token,
                email: email,
            }),
        };
        const response = await fetch(apiURL, requestOptions);
        return await response.json();
    },
    async resend(email) {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
            }),
        };
        const response = await fetch(apiURL, requestOptions);
        return await response.json();
    },
};
