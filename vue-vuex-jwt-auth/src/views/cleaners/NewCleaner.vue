<template>
  <div class="col-md-12">
    <div class="card card-container">
      <div v-if="!successful">
      <form name="form" @submit.prevent="handleRegister">
          <!-- title -->
          <div class="form-group">
            <label for="title">Назва</label>
            <input
              v-model="cleaner.title"
              v-validate="'required'"
              type="text"
              class="form-control"
              name="title"
              placeholder="Чистюня"
            />
            <div
              v-if="submitted && errors.has('title')"
              class="alert-danger"
            >{{errors.first('title')}}</div>
          </div>
          <!-- description -->
          <div class="form-group">
            <label for="email">Опис</label>
            <textarea
            v-model="cleaner.description"
            v-validate="'required'"
            type="text"
            class="form-control"
            name="description" 
            placeholder="У нас вигідна ціна і дуже швидке та якісне прання." 
            rows="2"></textarea>
            <div v-if="submitted && errors.has('description')" class="alert-danger">
              {{errors.first('description')}}
            </div>
          </div>
          <!-- name service -->
          <div class="form-group">
            <label for="name">Послуги</label>
            <v-select 
              v-model="cleaner.services"
              v-validate="'required'"
              name="name"
              :options="services" 
              label="split"
              multiple
            ></v-select>
            <div
              v-if="submitted && errors.has('name')"
              class="alert-danger"
            >{{errors.first('name')}}</div>
            <input type="button" style="margin:15px 0 0 0" class="btn btn-primary btn-block" id="show-modal" @click="showModal = true" value="Нова послуга"/>
          <Modal v-if="showModal" @close="showModal = false;uploadServicesSelect()">
            <h3 slot="header">Нова послуга</h3>
          </Modal>
          </div>
          <!-- Images -->
          <div class="form-group">
            <label for="image">Галерея</label>
            <input type="file" @change="uploadFile" multiple>
          </div>
          <div class="form-group">
            <button type="submit" @submit.prevent="next" class="btn btn-success btn-block">Створити хімчистку</button>
          </div>
      </form>
      </div>
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
</template>

<script>
import Cleaner from '../../models/cleaner';
import Modal from '../modals/md.vue';

export default {
  components: {
    Modal,
  },
  name: 'Register',
  data() {
    return {
      files: null,
      user: null,
      cleaner: new Cleaner('', '', '', ''),
      submitted: false,
      successful: false,
      message: '',
      showModal: false,
      fullname: 'asdasd',
      currentMonth: (new Date().getMonth() + 1) < 10 ? `0${(new Date().getMonth() + 1)}` : `${(new Date().getMonth() + 1)}`,
      currentDay: new Date().getDate() < 10 ? `0${(new Date().getDate())}` : `${(new Date().getDate())}`,
      currentYear: new Date().getFullYear(),
      dateNow: '',
      services: [],
    };
  },
  async mounted() {
    this.uploadServicesSelect()
  },
  methods: {
    uploadFile (event) {
      this.files = event.target.files
    },
    async uploadServicesSelect() {
        if (localStorage.getItem('services')) {
          this.services = JSON.parse(localStorage.getItem('services'));
          this.services = this.services.map((el) => {
            el.split = `${el.name} -> ${el.cost}$`;
            return el;
          })
        }
    },
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          const formData = new FormData();
          for (const i of Object.keys(this.files)) {
            formData.append('files', this.files[i])
          }
          formData.set('services', JSON.stringify(this.cleaner.services))
          formData.set('description', this.cleaner.description)
          formData.set('title', this.cleaner.title)
          this.user = JSON.parse(localStorage.getItem('user'));
          formData.set('user_id', this.user.id)
          this.$store.dispatch('cleaner/new', formData).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    },
    reloadPage() {
      window.location.reload();
    },
  },
  async beforeMount() {
    const reload = await this.$store.dispatch('auth/updateStorage');
    if (reload) window.location.reload();
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>