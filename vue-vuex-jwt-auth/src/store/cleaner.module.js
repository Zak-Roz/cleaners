import Cleaner from '../services/cleaner.service';

export const cleaner = {

  namespaced: true,
  actions: {
    getAll() {
      return Cleaner.getAll();
    },

    getById(_, id) {
      return Cleaner.getById(id);
    },

    new(_, data) {
      return Cleaner.new(data).then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
  },
};
