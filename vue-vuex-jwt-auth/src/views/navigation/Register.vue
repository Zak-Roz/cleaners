<template>
  <div class="col-md-12">
    <div class="card card-container">
      <div v-if="!successful">
      <form name="form" @submit.prevent="handleRegister">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
          <!-- fullname -->
          <div class="form-group">
            <label for="fullname">ПІБ</label>
            <input
              v-model="user.fullname"
              v-validate="{required: true, regex: /[А-ЯІЇЄ]{1}[а-яіїє]{1,23}\s[А-ЯІЇЄ]{1}[а-яіїє]{1,23}\s[А-ЯІЇЄ]{1}[а-яіїє]{1,23}/}"
              type="text"
              class="form-control"
              name="fullname"
              placeholder="Іванов Іван Іванович"
            />
            <div
              v-if="submitted && errors.has('fullname')"
              class="alert-danger"
            >{{errors.first('fullname')}}</div>
          </div>
          <!-- login -->
          <div class="form-group">
            <label for="email">Електронна пошта</label>
            <input
              v-model="user.login"
              v-validate="'required|email|max:50'"
              type="email"
              class="form-control"
              name="email"
              placeholder="privatbank@ukr.net"
            />
            <div
              v-if="submitted && errors.has('email')"
              class="alert-danger"
            >{{errors.first('email')}}</div>
          </div>
          <!-- rights -->
          <div class="form-group">
            <label for="rights" style="margin: 0 0 15px 0">Рівні доступу</label>
            <div class="form-check form-check-inline" style="margin: 0 0px 0 60px" >
              <input class="checkmark" style="left: 32px" type="checkbox" id="user" v-model="user.rights" value="user">
              <label style="margin: 25px 0 0 0" for="user">Користувач</label>
            </div>
            <div class="form-check form-check-inline" style="margin: 0 0px 0 10px" >
              <input class="checkmark" style="left: 7px" type="checkbox" id="admin" v-model="user.rights" value="admin">
              <label for="admin" style="margin: 25px 0 0 0" >Адмін</label>
            </div>
            <div
              v-if="submitted && errors.has('rights')"
              class="alert-danger"
            >{{errors.first('rights')}}</div>
          </div>
          <!-- secret-code -->
          <div class="form-group">
            <label for="code">Секретний код для відновлення</label>
            <input
              v-model="user.code"
              v-validate="'required|min:5|max:50'"
              type="password"
              class="form-control"
              name="code"
              placeholder="Введіть код"
              ref="code"
            />
            <div
              v-if="submitted && errors.has('code')"
              class="alert-danger"
            >{{errors.first('code')}}</div>
          </div>
          <div class="form-group">
            <label for="code_confirmation">Секретний код для відновлення</label>
            <input
              v-validate="'required|confirmed:code'"
              type="password"
              class="form-control"
              name="code_confirmation"
              placeholder="Ще раз введіть код"
              data-vv-as="code"
            />
            <div
              v-if="submitted && errors.has('code_confirmation')"
              class="alert-danger"
            >{{errors.first('code_confirmation')}}</div>
          </div>
          <!-- btn Sign Up -->
          <div class="form-group">
            <button type="submit" @submit.prevent="next" class="btn btn-primary btn-block" >Зареєструвати</button>
          </div>
      </form>
      </div>
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
      <div v-if="message && successful">
        <button class="btn btn-primary btn-block" @click="reloadPage()">Новий користувач системи</button>
      </div>
    </div>
  </div>
</template>

<script>
import User from '../../models/user';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', '', ''),
      submitted: false,
      successful: false,
      message: '',
    };
  },
  async mounted() {
    this.user.rights = [];

  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
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
  }
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