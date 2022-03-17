import axios from 'axios';

const API_URL = 'http://localhost:8080/api/order/';

class OrderService {
  getById(order) {
    return axios
      .get(`${API_URL}getById?id=${order}`)
      .then(response => {
        return response;
      });
  }
  
  getAllByUser(order) {
    return axios
      .get(`${API_URL}getAllByUser?id=${order}`)
      .then(response => {
        return response;
      });
  }
  
  getAllByAdmin(user_id) {
    return axios
      .get(`${API_URL}getAllByAdmin?user_id=${user_id}`)
      .then(response => {
        return response;
      });
  }

  getAll() {
    return axios.get(API_URL + 'getAll', {});
  }

  closeOrder(order_id) {
    return axios.get(`${API_URL}closeOrder?id=${order_id}`);
  }

  new(order) {
    return axios.post(API_URL + 'new', order);
  }

  update(order) {
    return axios.put(API_URL + 'update', order);
  }
}

export default new OrderService();
