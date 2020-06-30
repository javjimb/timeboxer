import React, { createContext, useReducer, useEffect } from "react";
import auth from "../helper/auth";

// Services
import AuthService from "../services/AuthService";

//fetch my details with auth/me

let initialState = () => {
    const getUser = () => {
        AuthService.getUser().then();
    };
};

const userContext = createContext(initialState);
const { Provider } = userContext;

const StateProvider = (props) => {
    const [state, dispatch] = useReducer((state, action) => {
        const localData = localStorage.getItem("token");

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

export { userContext, StateProvider };
