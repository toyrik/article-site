import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        article: {
            comments: [],
            tags: [],
            statistic: {
                likes: 0,
                views: 0
            }
        },
        slug: '',
        likeIt: true,
        commentSuccess: false,
        errors: [],
    },
    actions: {
        getArticleData(context, payload) {
            axios.get('/api/article-json', {params: {slug:payload}})
                .then((response)=>{
                context.commit('SET_ARTICLE', response.data.data);
                }).catch(()=>{
                    console.log('Error get article data');
                });
        },
        viewsIncrement(context, payload) {
            setTimeout(() => {
                axios.put('/api/article-views-increment', {slug:payload})
                    .then((response) => {
                        context.commit('SET_ARTICLE', response.data.data);
                    })
                    .catch(() => {
                        console.log('Error views increment');
                    });
            }, 5000)
        },
        addLike(context, payload) {
            axios.put('/api/article-likes-increment', {slug:payload.slug, increment:payload.increment})
                .then((response) => {
                    context.commit('SET_ARTICLE', response.data.data);
                    context.commit('SET_LIKE', !context.state.likeIt);
                })
                .catch(() => {
                    console.log('Error addLike');
                });
                console.log('after click on button', context.state.likeIt);
        },
        addComment(context, payload) {
            axios.post('/api/article-add-comment', {subject:payload.subject, body:payload.body, article_id:payload.article_id})
                .then((response) => {
                    context.commit('SET_COMMENT_SUCCESS', !context.state.commentSuccess);
                    context.dispatch('getArticleData', context.state.slug);
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        context.state.errors = error.response.data.errors;
                    }
                });
        }
    },
    getters: {
        articleViews(state) {
            return state.article.statistic.views;
        },
        articleLikes(state) {
            return state.article.statistic.likes;
        }
    },
    mutations: {
        SET_ARTICLE(state, payload)
        {
            state.article = payload;
        },
        SET_SLUG(state, payload)
        {
            state.slug = payload;
        },
        SET_LIKE(state, payload)
        {
            state.likeIt = payload;
        },
        SET_COMMENT_SUCCESS(state, payload)
        {
            state.commentSuccess = payload;
        },
    }
});
