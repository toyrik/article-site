window._ = require('lodash');
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.Vue = require('vue').default;

import store from  './store';

Vue.component('article-component', require('./components/ArticleComponent.vue').default);
Vue.component('views-component', require('./components/ViewsComponent.vue').default);
Vue.component('likes-component', require('./components/LikesComponent.vue').default);

const app = new Vue({
    store,
    el: '#app',
    created() {
        let url = window.location.pathname;
        let slug = url.substring(url.lastIndexOf('/')+1);

        store.commit('SET_SLUG', slug);
        store.dispatch('getArticleData', slug);
        store.dispatch('viewsIncrement', slug);
    }
});
