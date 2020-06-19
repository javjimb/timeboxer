import Cookies from 'universal-cookie';

class Auth {
    constructor() {
        this.authenticated = false;
    }
    login(cb) {
        this.authenticated = true;
        cb();
    }

    logout(cb) {
        this.authenticated = false;
        cb();
    }
    isAuthenticated() {
        return this.authenticated;
    }
    getAuthHeader() {
        let cookies = new Cookies();
        return  { 'x-access-token' : cookies.get('token')};
    }
}

export default new Auth();
