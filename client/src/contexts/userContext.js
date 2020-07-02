import React, { createContext, useReducer, useEffect } from "react";

// Services
import AuthService from "../services/AuthService";

const userContext = createContext();
const { Provider } = userContext;

const StateProvider = (props) => {
    const [user, dispatch] = useReducer(
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
        async () => {
            let user;
            if (localStorage.getItem("token")) {
                user = await AuthService.getUser();
            }
            return user || {};
        }
    );

    return <Provider value={{ user, dispatch }}>{props.children}</Provider>;
};

export { userContext, StateProvider };
