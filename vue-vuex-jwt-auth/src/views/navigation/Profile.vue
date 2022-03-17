<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        Обліковий запис користувача <strong>{{currentUser.fullname}}</strong>
      </h3>
    </header>
    <input type="button" style="margin:15px 0 0 0;width: 15%" class="btn btn-success" id="show-modal" @click="showModal = true" value="Змінити пароль"/>
    <mdPass v-if="showModal" @close="showModal = false;">
      <h3 slot="header">Зміна пароля</h3>
    </mdPass>
    <input type="button" style="margin:15px 0 0 20px;width: 200px" class="btn btn-success" @click="updateWallet()" value="Поповнення на +100 $" />
    <div style="padding: 10px 0"></div>
    <p>
      <strong>Логін:</strong>
      {{currentUser.login}}
    </p>
    <strong>Ваші рівні доступу:</strong>
    <ul>
      <li v-for="(role,index) in currentUser.rights" :key="index">{{role}}</li>
    </ul>
  </div>
</template>

<script>
import mdPass from './../modals/md-pass.vue';

export default {
  components: {
    mdPass,
  },
  data() {
    return {
      showModal: false,
      user: null,
    };
  },
  methods: {
    updateWallet() {
      this.user = JSON.parse(localStorage.getItem('user'))
      this.user.wallet += 100;
      this.$store.dispatch('user/changeWallet', { login: this.user.login, wallet: this.user.wallet }).then((el) => {
        if (el.data.message !== 'Success') {
          alert('Не вдалося зняти з рахунку гроші. Зверніться в підтримку.')
          return;
        } 
      })

      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(this.user));
      window.location.reload();
    }
  },
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
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