<template>
  <div class="container">
    <div v-if="access">
      <header class="jumbotron">
        <div>
          <h3>{{content}}</h3>
        </div>
      </header>
      <div v-if="!content.match(/No|found|Не|Net/g)">
        <router-link to="/new-cleaner" class="but-link">
          <button class="btn btn-success">
              Створити нову хімчистку
          </button>
        </router-link>
        <router-link to="/all-orders" class="but-link">
          <button style="margin: 10px; 0 0 0" class="btn btn-success">
            Замовлення користувачів
          </button>
        </router-link>
        <router-link :to="`/all-users/${user.id}`" class="but-link">
          <button class="btn btn-success">
            Клієнти
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
  name: 'Admin',
  data() {
    return {
      content: '',
      access: false,
      user: null,
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.access = this.user.rights.some((el) => el === 'RIGHT_ADMIN');
    UserService.getAdminBoard().then(
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