import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        login: user.login,
        password: user.password,
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response;
      });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('services');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      fullname: user.fullname,
      login: user.login,
      password: user.password,
      code: user.code,
      rights: user.rights,
    });
  }
  
  updateStorage() {
    const userObj = JSON.parse(localStorage.getItem('user'));
    return axios.get(`${API_URL}updateStorage?login=${userObj.login}`)
      .then(response => {
        if (response.data.user.wallet === userObj.wallet) {
          return null;
        }
        if (response.data.user.wallet) {
          localStorage.removeItem('user');
          userObj.wallet = response.data.user.wallet;
          localStorage.setItem('user', JSON.stringify(userObj));
        }
        return response;
      });
  }
}

export default new AuthService();
