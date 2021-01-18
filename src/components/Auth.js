class Auth {
  constructor() {
    const tempToken = JSON.parse(localStorage.getItem("login"));
    if (localStorage.getItem("login")) {
      this.authToken = tempToken.token;
      this.userId = tempToken.id;
      this.privilldedge = tempToken.privilledge;
      this.isAuthenticated = true;
    } else {
      this.authToken = "";
      this.isAuthenticated = false;
      this.userId = "";
      this.privilldedge = "";
    }
  }
  authenticate() {
    this.isAuthenticated = true;
  }
  signout() {
    this.isAuthenticated = false;
    localStorage.removeItem("login");
    this.authToken = "";
    this.userId = "";
  }
  getAuth() {
    return this.isAuthenticated;
  }
  getAuthAdmin() {
    // console.log(this.privilldedge);
    if (this.privilldedge === "Admin") {
      return this.isAuthenticated;
    }
    return false;
  }
  getAuthToString() {
    return this.isAuthenticated ? "Logged in" : "Not logged in";
  }
  setToken(token) {
    this.authToken = token;
    this.authenticate();
  }
  getAuthToken() {
    return this.authToken;
  }
  setUserId(id) {
    this.userId = id;
  }
  setPrivilledge(privilledge) {
    this.privilldedge = privilledge;
  }
  getUserId() {
    return this.userId;
  }
}
export default Auth;
