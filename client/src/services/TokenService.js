require("dotenv").config();

const apiURL = process.env.REACT_APP_API_URL + "/tokens/";

export default {
    async verifyUser(token) {
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: token,
            }),
        };
        const response = await fetch(apiURL + "/:token", requestOptions);
        return await response.json();
    },
};
