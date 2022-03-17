<template>
  <div class="container">
    <div v-if="access">
      <header class="jumbotron">
      <div>
        <h3>{{content}}</h3>
      </div>
      </header>
      <div v-if="!content.match(/No|found|Не|Net/g)">
        <router-link to="/cleaners" class="but-link">
          <button style="margin:10px;" class="btn btn-success">
            Список хімчисток
          </button>
        </router-link>
        <router-link to="/my-orders" class="but-link">
          <button style="margin:10px;" class="btn btn-success">
            Мої замовлення
          </button>
        </router-link>
      </div>
    </div>
    <div style="padding: 0 30%">
      <div v-if="!access"
      class="alert"
      style="text-align: center;"
      :class="'alert-danger'"
      >
        Сторінка за даним запитом не доступна

      </div>
    </div>
  </div>
</template>

<script>
import UserService from '../../services/user.service';

export default {
  name: 'User',
  data() {
    return {
      access: false,
      content: ''
    };
  },
  mounted() {
    const local = JSON.parse(localStorage.getItem('user'));
    this.access = local.rights.some((el) => el === 'RIGHT_USER');
    UserService.getUserBoard().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
  async beforeMount() {
    const reload = await this.$store.dispatch('auth/updateStorage');
    if (reload) window.location.reload();
  },
};
</script>
<style scoped>
.container {
  margin-top: 1rem;
}
</style>