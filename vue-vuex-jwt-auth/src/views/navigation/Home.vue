<template>
  <div class="container">
    <div class="card border-0 mt-5" align="center">
      <div class="row align-items-center">
        <div>
          <img src="https://www.stardryclean.com.ua/image/cache/catalog/Banners/ostavaysja-dom1a-1920x1080.jpg" width="100%">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '../../services/user.service';

export default {
  name: 'Home',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getPublicContent().then(
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