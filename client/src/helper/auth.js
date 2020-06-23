import Cookies from "universal-cookie";

class Auth {
    constructor() {
        this.authenticated = false;
        this.cookies = new Cookies();
    }
    login(cb) {
        this.authenticated = true;
        cb();
    }

    logout(cb) {
        this.authenticated = false;

        this.cookies.remove("token");
        cb();
    }
    isAuthenticated() {
        let token = this.cookies.get("token");
        if (token) {
            this.authenticated = true;
        }
        return this.authenticated;
    }
    getAuthHeader() {
        return { "x-access-token": this.cookies.get("token") };
    }
}

export default new Auth();
