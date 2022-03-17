<template>
  <div class="col-md-12">
    <div class="">
      <form v-if="!successful && access && order.status_order._id !== 3 && order.status_order._id !== 4" style="margin: 20px 0 0 0; padding: 0 15%" class="needs-validation" novalidate name="form" @submit.prevent="handleRegister">
        <h3 style="text-align: center; margin: 0px 0 0px 0"><b>Замовлення № {{order._id}}</b></h3>
        <div >
          <!-- code&name -->
          <table width="100%" cellpadding="5">
            <tbody>
              <!-- Довіритель -->
              <tr>
                <td>
                  <lable for="fullname">ПІБ</lable>
                </td>
                <td>
                  <lable for="service">Послуга</lable>
                </td>
              </tr>
              <tr>
                <td>
                  <input 
                    v-model="order.fullname"
                    v-validate="{required: false, regex: fullnameReg()}"
                    type="text"
                    class="form-control" 
                    name="fullname"
                  />
                  <div v-if="submitted && errors.has('fullname')" class="alert-danger">
                    {{errors.first('fullname')}}
                  </div>
                </td>
                <td>
                  <input 
                    v-model="order.service"
                    v-validate="{required: false}"
                    type="text"
                    class="form-control" 
                    name="service"
                  />
                  <div v-if="submitted && errors.has('service')" class="alert-danger">
                    {{errors.first('service')}}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table width="100%" cellpadding="5">
            <tbody>
            <!-- dates -->
            <tr>
              <td width="50%">
                <lable for="date">Дата створення</lable>
              </td>
              <td width="50%">
                <lable for="cost">Вартість</lable>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  v-model="changeDate"
                  type="date"
                  class="form-control"
                  name="date"
                />
                <div v-if="submitted && errors.has('date')" class="alert-danger">
                  {{errors.first('date')}}
                </div>
              </td>
              <td>
                <input
                  v-model="order.cost"
                  v-validate="`required|min_value:1`"
                  type="number"
                  class="form-control"
                  name="cost"
                />
                <div v-if="submitted && errors.has('cost')" class="alert-danger">
                  {{errors.first('cost')}}
                </div>
              </td>
            </tr>

            </tbody>
          </table>
          <!-- status -->
          <table width="100%" cellpadding="5">
            <tbody>
              <tr>
                <td class="td-width">
                <v-select 
                  @input="checkStatus($event)"
                  v-model="status"
                  name="status_order"
                  :options="status_order" 
                  label="status_order"
                ></v-select>
                <div
                  v-if="submitted && errors.has('status_order')"
                  class="alert-danger"
                >{{errors.first('status_order')}}</div>
                <!-- <input type="button" style="margin:15px 0 0 0" class="btn btn-primary btn-block" id="show-modal" @click="showModal = true" value="Добавити нову установу"/>
                <Modal v-if="showModal" @close="showModal = false;uploadWorkSelect()">
                  <h3 slot="header">Добавити нову установу</h3>
                </Modal> -->
              </td>
              </tr>
            </tbody>
          </table>
          <!-- description -->
          <table v-if="showText" width="100%" cellpadding="5">
            <tbody>
              <tr>
                <td>
                  <textarea
                  v-model="order.description"
                  v-validate="'required'"
                  type="text"
                  class="form-control"
                  name="description" 
                  placeholder="Нажаль хімчистка вже не працює." 
                  rows="2"></textarea>
                  <div v-if="submitted && errors.has('description')" class="alert-danger">
                    {{errors.first('description')}}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- submit -->
          <table width="100%" cellpadding="5">
            <tbody>
              <tr>
                <td style="border-left: 20px solid white; border-right: 20px solid white; color: white; text-align: center;">
                  <button class="btn btn-success"  type="submit" @submit.prevent="next">Зберегти зміни</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
      <div style="padding: 1% 35%; text-align: center;" >
        <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
          {{message}}
        </div>
      </div>
      <div style="padding: 0 38%" v-if="message && successful">
        <button class="btn btn-primary btn-block" @click="$router.push(`/order/${order._id}`)">Повернутися до замовлення</button>
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
    <div v-if="order.status_order._id === 3 || order.status_order._id === 4"
    class="alert"
    style="text-align: center;"
    :class="'alert-danger'"
    >
      Замовлення закрите!
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'NewPoa',
  data() {
    return {
      access: false,
      editAccess: false,
      isActive: '',
      order: null,
      submitted: false,
      successful: false,
      changeDate: null,
      verDate: null,
      cost: null,
      message: '',
      status_order: [
        'В обробці',
        'Готовий до видачі',
        'Повернення',
      ],
      status: null,
      showText: false
    };
  },
  async created() {
    try {
    const data = await this.$store.dispatch('order/getById', this.$route.params.id)
    this.order = data.data; 
    if(this.order === null) throw '';
    this.saveCost = this.order.cost; 
    const Month = (new Date(this.order.date).getMonth() + 1) < 10 ? `0${(new Date(this.order.date).getMonth() + 1)}` : `${(new Date(this.order.date).getMonth() + 1)}`;
    const Day = new Date(this.order.date).getDate() < 10 ? `0${(new Date(this.order.date).getDate())}` : `${(new Date(this.order.date).getDate())}`;
    const Year = new Date(this.order.date).getFullYear();
    this.changeDate = `${Year}-${Month}-${Day}`;
    this.verDate = `${Year}-${Month}-${Day}`;
    this.status = this.order.status_order.name;
    const user = JSON.parse(localStorage.getItem('user'));
    this.access = user.rights.some((el) => el === 'RIGHT_ADMIN') && user.id == this.order.cleaner.owner;
    } catch(err) {
      alert('Замовлення не знайдено.'); 
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.order.status = this.status;
          const dataToPut = {
            _id: this.order._id,
            fullname: this.order.fullname,
            service: this.order.service,
            cost: null,
            date: this.changeDate === this.verDate ? new Date(this.order.date) : new Date(this.changeDate),
            status: this.status,
            description: null,
          }
          if (this.status === this.status_order[2]) {
            this.order.user.wallet += this.saveCost;
            dataToPut.cost = this.order.cost;
            dataToPut.description = this.order.description;
            this.$store.dispatch('user/changeWallet', { login: this.order.user.login, wallet: this.order.user.wallet }).then((el) => {
              if (el.data.message !== 'Success') {
                alert('Не вдалося зняти з рахунку гроші. Зверніться в підтримку.')
                return;
              }
            })
          } else if(this.saveCost !== this.order.cost) {
            const dif = this.order.cost < this.saveCost ? this.saveCost - this.order.cost : -(this.order.cost - this.saveCost);
            if (this.order.user.wallet + dif >= 0) {
              dataToPut.cost = this.order.cost;
              this.order.user.wallet += dif;
              this.$store.dispatch('user/changeWallet', { login: this.order.user.login, wallet: this.order.user.wallet }).then((el) => {
                if (el.data.message !== 'Success') {
                  alert('Не вдалося зняти з рахунку гроші. Зверніться в підтримку.')
                  return;
                }
              })
            } else {
              alert('Не хватає грошей у користувача для отримання цієї послуги.')
            }
          }
          this.$store.dispatch('order/update', dataToPut).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    },
    fullnameReg() {
      return /[А-ЯІЇЄ]{1}[а-яіїє]{1,23}\s[А-ЯІЇЄ]{1}[а-яіїє]{1,23}\s[А-ЯІЇЄ]{1}[а-яіїє]{1,23}/;
    },
    checkStatus(event) {
      this.status = event;
      if(event === this.status_order[2]) {
        this.showText = true;
      } else {
        this.showText = false;
      }
    },
  }
};
</script>