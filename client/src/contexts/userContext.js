import React, { createContext, useReducer, useEffect } from "react";

// Services
import AuthService from "../services/AuthService";

export const userContext = createContext();
const { Provider } = userContext;

const UserContextProvider =  (props) => {

    const [user, dispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case "saveUser":
                    return { ...state, ...action.userData };
                default:
                    return state;
            }
        }, {});

    useEffect(() => {
        AuthService.getUser().then(user => {
            dispatch( { type: 'saveUser', userData: user} );
        })
    },[])

    return <Provider value={{ user, dispatch }}>{props.children}</Provider>;
};

export default UserContextProvider;
