import React, { createContext, useReducer } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();
let user = cookies.get("user");
const initialState = {
    user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        avatar: user.avatar,
    },
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "setLogin":
                return { ...state, user: action.userData };
            default:
                // throw new Error();
                return state;
        }
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
