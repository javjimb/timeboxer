import React, { createContext, useReducer } from "react";

const initialState = {
    user: {
        _id: "5ece8a4516bad442b07a6d07",
        email: "test@gmail.com",
        name: "Joan",
        surname: "Doe",
        avatar: "",
    },
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "setUser":
                return { ...state, user: action.userData };
            default:
                throw new Error();
        }
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
