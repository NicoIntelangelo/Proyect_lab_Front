class AuthService {
  isLoggedIn() {
    const session = JSON.parse(localStorage.getItem("session"));
    if (session) {
      if (session.expiresIn) {
        const expirationDate = new Date(session.expiresIn);
        const currentDate = new Date();
        if (currentDate > expirationDate) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getSession() {
    const item = localStorage.getItem("session") || "invalid";
    if (item !== "invalid") {
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
  }
}

export default AuthService;
