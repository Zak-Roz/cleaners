<template>
<div>
  <div class="order-done">
    <h3>Замовлення № {{order._id}}</h3>
    <p>Статус: <strong>{{order.status_order.name}}</strong></p>
    <p>Отримувач: <strong>{{order.fullname}}</strong></p>
    <p>Хімчистка: <strong>{{order.cleaner.title}}</strong></p>
    <p>Послуга: <strong>{{order.service}}</strong></p>
    <p>Всього до сплати: <strong>{{order.cost}} $</strong></p>
    <p><strong>{{order.status_order._id !== 3 && order.status_order._id !== 4 ? 'Оплачено!' : ''}}</strong></p>
    <p>Дата: <strong>{{order.date}}</strong></p>
    <p v-if="order.description">
      Повідомлення від адміністратора: <strong>{{order.description}}</strong>
    </p>
    <div v-if="order.isEnabled" style="margin: 10px; justify-content: center">
      <button v-if="this.editAccess && order.status_order._id !== 3 && order.status_order._id !== 4" style="margin: 10px;" @click="$router.push(`/edit-order/${order._id}`)" type="button" class="btn btn-outline-dark">Редагувати</button>
      <button v-if="this.access && order.status_order._id === 2" style="margin: 10px;" @click="CloseOrder()" type="button" class="btn btn-outline-dark">Завершити</button>
    </div>
  </div>
</div>

</template>

<script>

export default {
  data() {
    return {
      order: null,
      editAccess: null,
      access: null,
      user: null,
    }
  },
  methods: {
    CloseOrder() {
      this.$store.dispatch('order/closeOrder', this.order._id).then((data) => {
          alert(data.data.message);
          setTimeout(() => {window.location.reload();}, 50)
        }
      );
    }
  },
  created() {
    this.$store.dispatch('order/getById', this.$route.params.id)
      .then(
        data => {
          if (data.data === null) {
            throw '';
          }
          this.user = JSON.parse(localStorage.getItem('user'))
          this.order = data.data;
          if(this.user.id === this.order.cleaner.owner) {
            this.editAccess = true;
          }
          if(this.user.id === this.order.user._id) {
            this.access = true;
          }
        },
        error => {
          alert(error.toString())
        })
      .catch(() => { alert('Замовлення не знайдено.'); })
  },
  async beforeMount() {
    const reload = await this.$store.dispatch('auth/updateStorage');
    if (reload) window.location.reload();
  },
}
</script>

<style>
.order-done {
  margin: 3% 0 0 20%;
}
</style>