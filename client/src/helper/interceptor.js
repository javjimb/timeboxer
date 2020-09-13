import fetchIntercept from "fetch-intercept";
import  auth from '../helper/auth';
import history from "./history.js";

export const unregister = fetchIntercept.register({
    request: function (url, config) {
        // Send request as it is
        return [url, config];
    },

    requestError: function (error) {
        return Promise.reject(error);
    },

    response: function (response) {
        // Jump to Login page if 401 or 403 error
        if (response.status === 401 || response.status === 403) {
            auth.logout(() => {history.push("/login");})
        }
        return response;
    },

    responseError: function (error) {
        return Promise.reject(error);
    },
});
