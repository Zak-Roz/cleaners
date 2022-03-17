<template>
<div>
  <div v-if="access">
    <h1 class="name-user">{{ user.fullname }}</h1>
    <table class="table table-striped table-hover center-table" style="width: 60%;">
      <tbody>
        <tr>
          <th scope="row">Пошта</th>
          <td>{{user.login}}</td>
        </tr>
        <tr>
          <th scope="row">Рівні доступа:</th>
          <td>
            <p v-for="(role,index) in user.right" :key="index">{{role === 1 ? 'Користвуач' : 'Адміністратор'}}</p>
          </td>
        </tr>
        <tr>
          <th scope="row">Статус користувача:</th>
          <td>
            <p>Активний</p>
          </td>
        </tr>
        <tr>
          <th scope="row">Дата реєстрації:</th>
          <td>
            {{user. registeredAt}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
  
</template>

<script>

export default {
  data() {
    return {
      user: null,
      access: false,
      width: 600,
      height: 400,
      items: [],
      currentId: null,
    }
  },
  async created() {
    try {
      this.access = true;
      this.user = (await this.$store.dispatch('user/getById', this.$route.params.id)).data.user;
    } catch(err) {
      alert(err.toString()); 
    }
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },
  },

}
</script>

<style>
.lingallery {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.center-table {
  margin: 1% 0;
  margin-left: auto;
  margin-right: auto;
}

.description {
  margin: 1% 0 1% 20%;
  text-align: left;
}

.name-user {
  margin: 1% 0;
  text-align: center;
}
</style>