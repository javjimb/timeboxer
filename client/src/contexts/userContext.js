import React, { createContext, useReducer, useEffect } from "react";

// Services
import AuthService from "../services/AuthService";

const userContext = createContext();
const { Provider } = userContext;

const StateProvider = (props) => {
    const [state, dispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case "saveUser":
                    return { ...state, user: action.userData };
                default:
                    // throw new Error();
                    return state;
            }
        },
        {},
        () => {
            console.log(localStorage.getItem("token"));
            return localStorage.getItem("token") ? AuthService.getUser() : {};
        }
    );

    return <Provider value={{ state, dispatch }}>{props.children}</Provider>;
};

export { userContext, StateProvider };
