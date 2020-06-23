import auth from "../helper/auth";
const apiURL = "http://localhost:5000/users";

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
    async updateUser(id, name, surname, avatar) {
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...auth.getAuthHeader(),
            },
            body: JSON.stringify({
                _id: id,
                name: name,
                surname: surname,
                avatar: avatar,
            }),
        };
        const response = await fetch(apiURL, requestOptions);
        return await response.json();
    },
};
