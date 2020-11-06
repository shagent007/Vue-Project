import {LoginReply} from "@/api/clients";

class SessionManager {
    
    private static SESSION_TOKEN_KEY = "lg-token";
    
    private storage: Storage = localStorage;

    setToken(token: LoginReply): void {
        localStorage.setItem(SessionManager.SESSION_TOKEN_KEY, JSON.stringify(token));
    }


    getToken(): LoginReply {
        return JSON.parse(localStorage.getItem(SessionManager.SESSION_TOKEN_KEY) ?? "");
    }

   cleanSession() {
       localStorage.removeItem(SessionManager.SESSION_TOKEN_KEY);
    }
}

const sessionManager = new SessionManager();
export default sessionManager;