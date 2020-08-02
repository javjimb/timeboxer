const apiURL = process.env.REACT_APP_API_URL + "/password";

export default {
    async resetPassword(email) {
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

        if (response.status === 204) {
            return true;
        } else {
            response.reject(response.json.errors);
        }
    },
};
