class AuthService {
    constructor() {
        this.loggedIn = false;
    }

    isLoggedIn() {
        return this.loggedIn;
    }

    getSession() {
        const item = localStorage.getItem("session") || "invalid";
        if (item !== "invalid") {
            this.loggedIn = true;
            return JSON.parse(item);
        }
        return { expiresIn: "", token: "" };
    }

    setUserId(id) {
        localStorage.setItem("Id", id);
    }

    setSession(token, expiresTimeHours = 1) {
        const date = new Date();
        date.setHours(date.getHours() + expiresTimeHours);
        const session = {
            expiresIn: new Date(date).toISOString(),
            token,
        };

        this.loggedIn = true;
        localStorage.setItem("session", JSON.stringify(session));
    }

    async getMe() {
        const res = await fetch("", {
            headers: {
                Authorization: this.getSession().token,
            },
        });
        return await res.json();
    }

    resetSession() {
        localStorage.removeItem("session");
        localStorage.removeItem("Id");
        this.loggedIn = false;
    }
}

export default AuthService;
