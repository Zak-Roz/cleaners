<template name="Modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header">
          <slot name="header">
            Нова послуга
          </slot>
          <button class="close" @click="$emit('close')">&times;</button>
        </div>

        <div class="modal-body">
          <form name="form" @submit.prevent="handleRegister">
            <div v-if="!successful">
              <div class="form-group">
                <label for="name">Назва послуги</label>
                <input
                  v-model="service.name"
                  v-validate="'required|min:3|max:50'"
                  type="text"
                  class="form-control"
                  name="name"
                  placeholder="Костюм"
                />
                <div
                  v-if="submitted && errors.has('name')"
                  class="alert-danger"
                >{{errors.first('name')}}</div>
              </div>
              <div class="form-group">
                <label for="cost">Вартість $</label>
                <input
                  v-model="service.cost"
                  v-validate="'required|min_value:1'"
                  type="number"
                  class="form-control"
                  name="cost"
                  placeholder="25"
                />
                <div
                  v-if="submitted && errors.has('cost')"
                  class="alert-danger"
                >{{errors.first('cost')}}</div>
              </div>
              <div class="form-group">
                <button class="btn btn-primary btn-block">Створити</button>
              </div>
            </div>
          </form>
          <div
            v-if="message"
            class="alert"
            :class="successful ? 'alert-success' : 'alert-danger'"
          >{{message}}</div>
          <div v-if="message && successful">
            <button class="btn btn-primary btn-block" @click="message='';successful=false">Створити ще</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: 'Register',
  data() {
    return {
      service: {},
      submitted: false,
      successful: false,
      message: '',
      showModal: false,
    };
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          if(localStorage.getItem('services')) {
            let services = JSON.parse(localStorage.getItem('services'));
            localStorage.removeItem('services');
            services.push(this.service)
            localStorage.setItem('services', JSON.stringify(services));
          } else {
            localStorage.setItem('services', JSON.stringify([this.service]));
          }
          this.message = 'Done!';
          this.successful = true;
        }
      });
    },
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 350px;
  margin: 0px auto;
  padding: 0px 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 0px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.close {
  line-height: 32px;
  color: #5c4084;
}
</style>