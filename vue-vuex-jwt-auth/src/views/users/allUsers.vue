<template>
  <div id="app">
    <div v-if="users.length">
      <div
        class="user"
        v-for="user in users"
        :key="user.first"
      >
        <div class="user-details">
          <h2 class="user-name">
            <router-link :to="`/user/${user._id}`">
              {{ user.fullname }}
            </router-link>
          </h2>
          <p style="margin: 5px 0 0 0">Рівні доступа:</p>
          <ul>
            <li v-for="(role,index) in user.right" :key="index">{{role === 1 ? 'Користвуач' : 'Адміністратор'}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="users.error" class="user-error">
      <h1>{{ users.error }}</h1>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      users: [],
      error: null,
    };
  },
  methods: {
    getInitialUsers() {
      this.$store.dispatch('user/getAllByAdmin', this.$route.params.id).then(
        data => {
          this.users = data.data;
        },
        error => {
          alert(JSON.stringify(error))
        }
      );
    },
  },
  beforeMount() {
    this.getInitialUsers();
  },
};
</script>

<style>
.user {
  display: flex;
  background: #ccc;
  border-radius: 1em;
  margin: 1em auto;
}

.user-details {
  padding: 1em;
}

.user-name {
  margin: 0;
  padding: 0;
  font-size: 2rem;
  font-weight: 900;
}

.user-error {
  text-align: center;
  margin: 100px 0 0 0;
}
</style>