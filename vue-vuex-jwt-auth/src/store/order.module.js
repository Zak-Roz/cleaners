import OrderService from '../services/order.service';

export const order = {
  namespaced: true,
  actions: {
    getById(_, id) {
      return OrderService.getById(id).then(
        order => {
          return Promise.resolve(order);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    
    getAllByUser(_, id) {
      return OrderService.getAllByUser(id);
    },

    getAllByAdmin(_, user_id) {
      return OrderService.getAllByAdmin(user_id).then(
        orders => {
          return Promise.resolve(orders);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    getAll() {
      return OrderService.getAll();
    },
    closeOrder(_, order_id) {
      return OrderService.closeOrder(order_id);
    },
    new(_, order) {
      return OrderService.new(order).then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    update(_, order) {
      return OrderService.update(order).then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  },
};
