import UserService from '../services/user.service';

export const user = {

  namespaced: true,
  actions: {
    getById(_, id) {
      return UserService.getById(id).then(
        getData => {
          return Promise.resolve(getData);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    
    getAllByAdmin(_, id) {
      return UserService.getAllByAdmin(id).then(
        getData => {
          return Promise.resolve(getData);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },

    updatePass(_, user) {
      return UserService.updatePass(user).then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    
    forgotPass(_, user) {
      return UserService.forgotPass(user).then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },

    changeWallet(_, wallet) {
      return UserService.changeWallet(wallet).then(
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
