const apiURL = "http://localhost:5000/users";

export default {
    async createUser(email, password, name, surname) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password,
                name: name,
                surname: surname,
            }),
        };
        const response = await fetch(apiURL, requestOptions);
        const data = await response.json();
        return data;
    },
};
