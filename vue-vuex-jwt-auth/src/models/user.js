export default class User {
  constructor(rights, fullname, login, password, code) {
    this.fullname = fullname;
    this.login = login;
    this.password = password;
    this.code = code;
    this.rights = rights;
  }
}
