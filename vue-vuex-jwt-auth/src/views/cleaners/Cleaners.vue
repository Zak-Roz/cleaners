<template>
  <div id="app">
    <div v-if="cleaners.length">
      <div
        class="cleaner"
        v-for="cleaner in cleaners"
        :key="cleaner.first"
      >
        <div class="cleaner-avatar">
          <router-link :to="`/cleaner/${cleaner._id}`">
            <img :src="cleaner.images[0]" />
          </router-link>
        </div>
        <div class="cleaner-details">
          <h2 class="cleaner-name">
            <router-link :to="`/cleaner/${cleaner._id}`">
              {{ cleaner.title }}
            </router-link>
          </h2>
          Description:
          <p>{{ cleaner.description }}</p>
        </div>
      </div>
    </div>
    <div v-if="cleaners.error" class="cleaner-error">
      <h1>{{ cleaners.error }}</h1>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      cleaners: [],
      error: null,
    };
  },
  methods: {
    getInitialUsers() {
      this.$store.dispatch('cleaner/getAll').then(
        data => {
          this.cleaners = data.data;
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
.cleaner {
  display: flex;
  background: #ccc;
  border-radius: 1em;
  margin: 1em auto;
}

.cleaner-avatar {
  padding: 1em;
}

.cleaner-avatar img {
  display: block;
  width: 12em;
  border-radius: 100%;
}

.cleaner-details {
  padding: 1em;
}

.cleaner-name {
  margin: 0;
  padding: 0;
  font-size: 2rem;
  font-weight: 900;
}

.cleaner-error {
  text-align: center;
  margin: 100px 0 0 0;
}
</style>