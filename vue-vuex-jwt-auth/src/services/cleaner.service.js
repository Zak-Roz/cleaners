import axios from 'axios';

const API_URL = 'http://localhost:8080/api/cleaners/';

class Cleaner {
  getAll() {
    return axios.get(API_URL + 'getAll');
  }
  
  getById(id) {
    return axios.get(API_URL + `getById?id=${id}`);
  }

  new(cleaners) {
    return axios.post(API_URL + 'new', cleaners);
  }
}

export default new Cleaner();
