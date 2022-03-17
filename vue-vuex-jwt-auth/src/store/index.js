import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import { order } from './order.module';
import { cleaner } from './cleaner.module';
import { user } from './user.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    order,
    cleaner,
    user
  }
});
