<template>
  <div id="app">
    <div v-if="orders.length">
      <table class="table table-striped table-hover center-table" style="width: 80%;">
        <tbody>
          <tr>
            <th scope="row">Номер замовлення</th>
            <th>Статус замовлення</th>
            <th>Дата оформлення</th>
          </tr>
          <tr v-for="order in orders" :key="order._id">
            <td>
              <router-link :to="`/order/${order._id}`">
                {{order._id}}
              </router-link>
            </td>
            <td>{{order.status_order.name}}</td>
            <td>{{order.date}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="orders.error" class="order-error">
      <h1>{{ orders.error }}</h1>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      orders: [],
      user: null,
      error: null,
    };
  },
  methods: {
    getInitialUsers() {
      this.user = JSON.parse(localStorage.getItem('user'))
      this.$store.dispatch('order/getAllByAdmin', this.user.id).then(
        data => {
          this.orders = data.data;
        },
        error => {
          alert(JSON.stringify(error))
        }
      );
    },
  },
  beforeMount() {
    this.getInitialUsers();
  }
};
</script>


<style>
.order {
  display: flex;
  background: #ccc;
  border-radius: 1em;
  margin: 1em auto;
}

.order-avatar {
  padding: 1em;
}

.order-avatar img {
  display: block;
  width: 12em;
  border-radius: 100%;
}

.order-details {
  padding: 1em;
}

.order-name {
  margin: 0;
  padding: 0;
  font-size: 2rem;
  font-weight: 900;
}

.order-error {
  text-align: center;
  margin: 100px 0 0 0;
}
</style>