import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/user/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getById(id) {
    return axios.get(API_URL + `getById?id=${id}`);
  }
  
  getAllByAdmin(id) {
    return axios.get(API_URL + `getAllByAdmin?id=${id}`);
  }
  
  updatePass(user) {
    return axios.put(API_URL + 'updatePass', {
      login: user.login,
      password: user.password,
      oldPassword: user.oldPassword,
    });
  }
  
  forgotPass(user) {
    return axios.put(API_URL + 'forgotPass', {
      login: user.login,
      password: user.password,
      code: user.code,
    });
  }
  
  changeWallet(wallet) {
    return axios.put(API_URL + 'changeWallet', wallet);
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
