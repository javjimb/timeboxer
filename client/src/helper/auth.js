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
        this.cookies.remove("user");

        cb();
    }
    isAuthenticated() {
        let token = this.cookies.get("token");
        let user = this.cookies.get("user");
        console.log("cookies:", this.cookies);
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
