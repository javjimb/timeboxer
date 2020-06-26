import React, { createContext, useReducer } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();
let user = cookies.get("user") || {};
let initialState = {
    user: user,
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "saveUser":
                return { ...state, user: action.userData };
            default:
                // throw new Error();
                return state;
        }
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
