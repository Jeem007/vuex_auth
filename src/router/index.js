import {createRouter, createWebHistory} from 'vue-router'
import AuthLogin from '../pages/login.vue'
import ProjectHome from '../pages/Home.vue'
import AuthSignup from '../pages/signup.vue'
import PagesPosts from '../pages/Posts.vue'
import CreatePost from '../pages/CreatePost.vue'
import store from '../store/store'
import {IS_USER_AUTHENTICATED_GETTER} from '../store/storeconstants';
const routes=[
    {
        path:'/',
        name:'home',
        component:ProjectHome,
    },
    { 
        path:'/login',
        name:'login',
        component: AuthLogin,
        meta:{auth:false},
    },
    {
        path:'/signup',
        name:'signup',
        component: AuthSignup,
        meta:{auth:false},
    },
    {
        path:'/posts',
        name:'posts',
        component:PagesPosts,
        meta:{auth:true},
    },
    {
        path:'/createPost',
        name:'createPost',
        component:CreatePost,
        meta:{auth:true},

    }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach((to,from,next)=>{
  if('auth' in to.meta && to.meta.auth && !store.getters[`auth/${IS_USER_AUTHENTICATED_GETTER}`]){
        next('/login');
  }else if('auth' in to.meta && !to.meta.auth && store.getters[`auth/${IS_USER_AUTHENTICATED_GETTER}`]){
        next('/posts');
  }else{
    next();
  }
});

export default router;