<template>
<div>
  <div v-if="access">
    <h1 class="name-cleaner">{{ cleaner.title }}</h1>
    <div class="lingallery">
      <lingallery :iid.sync="currentId" :width="width" :height="height" :items="items"/>
    </div>
    <h4 class="description">Послуги:</h4>
    <table class="table table-striped table-hover center-table" style="width: 60%;">
      <tbody>
        <tr>
          <th scope="row">Назва послуги</th>
          <th>Вартість</th> 
          <th></th> 
        </tr>
        <tr v-for="service in cleaner.services" :key="service.name">
          <td>{{service.name}}</td>
          <td>{{service.cost}}</td>
          <td>
            <button style="margin-left: auto;margin-right: auto;" class="btn btn-success" v-on:click="createOrder(service)">Купити</button>
          </td>
        </tr>
      </tbody>
    </table>
    <h4 class="description">Опис:</h4>
    <p class="description">{{ cleaner.description }}</p>
  </div>
</div>
  
</template>

<script>
import Lingallery from 'lingallery';

export default {
  data() {
    return {
      cleaner: null,
      access: false,
      width: 600,
      height: 400,
      items: [],
      currentId: null,
      user: null
    }
  },
  async created() {
    try {
      this.access = true;
      this.user = JSON.parse(localStorage.getItem('user'));
      this.cleaner = (await this.$store.dispatch('cleaner/getById', this.$route.params.id)).data;
      this.items = this.cleaner.images.map((el) => ({
        src: el,
        thumbnail: el.replace('data', 'data/thumbnail'),
      }))
    } catch(err) {
      alert(err.toString()); 
    }
  },
  methods: {
    createOrder(service) {
      if (this.user.wallet < service.cost) {
        alert('У вас не достатньо грошей. Поповніть на сторінці профіля.')
        return;
      }

      const data = {
        cost: service.cost,
        service: service.name,
        cleaner_id: this.cleaner._id,
        user_id: this.user.id,
        fullname: this.user.fullname,
      }
      this.user.wallet -= service.cost;
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(this.user));

      this.$store.dispatch('user/changeWallet', { login: this.user.login, wallet: this.user.wallet }).then((el) => {
        if (el.data.message !== 'Success') {
          alert('Не вдалося зняти з рахунку гроші. Зверніться в підтримку.')
          return;
        } 
      })
      this.$store.dispatch('order/new', data).then((data_stat) => {
        alert(data_stat.message)
        setTimeout(() => this.reloadPage(), 10);
        this.$router.push({ path: `/order/${data_stat.id}` })
      })
    },
    reloadPage() {
      window.location.reload();
    },
  },
  components: {
    Lingallery
  }

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

.name-cleaner {
  margin: 1% 0;
  text-align: center;
}
</style>