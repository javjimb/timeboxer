import React from "react";
const userContext = React.createContext({
    user: {
        _id: "5ece8a4516bad442b07a6d07",
        email: "test@gmail.com",
        name: "Joan",
        surname: "Doe",
        avatar: "",
    },
}); // Create a context object

export {
    userContext, // Export it so it can be used by other Components
};
