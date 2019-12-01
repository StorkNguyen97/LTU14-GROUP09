import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import license from './modules/license';
import user from './modules/user';
import device from './modules/device';
import software from './modules/software';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        auth,
        license,
        user,
        device,
        software
    },
    strict: debug
});
