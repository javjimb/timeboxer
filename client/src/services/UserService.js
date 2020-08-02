import auth from "../helper/auth";
const apiURL = process.env.REACT_APP_API_URL + "/users";

export default {
    async createUser(email, password, name, surname) {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...auth.getAuthHeader(),
            },
            body: JSON.stringify({
                email: email,
                password: password,
                name: name,
                surname: surname,
            }),
        };
        const response = await fetch(apiURL, requestOptions);
        return await response.json();
    },
    async updateUser(id, user) {
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...auth.getAuthHeader(),
            },
            body: JSON.stringify(user),
        };
        const response = await fetch(apiURL + "/" + id, requestOptions);
        // console.log(response);
        return await response.json();
    },
};
