<template>
<div class=" bg-slate-100 text-lime-600 py-1 px-6 shadow md:flex justify-between ">

    <span @click="MenuOpen" class="absolute md:hidden right-6 top-1.5 cursor-pointer text-4xl">
        <i :class="[open ? 'bi bi-x':'bi bi-filter-left']"></i>
    </span>
    <ul class="md:flex md:items-center md:px-0 px-6 md:py-0 py-8 md:pb-0 pb-10 md:static absolute bg-slate-100 md:w-auto w-full top-18 duration-700 ease-in" :class="[open ? 'left-0' : 'left-[-100%]']">

        <li class=" md:mx-4 md:my-0 my-4">
            <router-link to="/" exact class="font-semibold hover:text-green-900 ">Home</router-link>
        </li>
        <li class=" md:mx-4 md:my-0 my-4"
        v-if ="!isAuthenticated">
            <router-link to="/login" exact class="font-semibold hover:text-green-900 ">Log In</router-link>
        </li>
        <li class=" md:mx-4 md:my-0 my-4" v-if="!isAuthenticated">
            <router-link to="/signup" exact class="font-semibold hover:text-green-900 ">Sign Up</router-link>
        </li>
        <li class=" md:mx-4 md:my-0 my-4"
        v-if="isAuthenticated">
            <router-link to="/createPost" exact class="font-semibold hover:text-green-900 ">Create Post</router-link>
        </li>
        <li class=" md:mx-4 md:my-0 my-4"
        v-if="isAuthenticated">
            <router-link to="/posts" exact class="font-semibold hover:text-green-900 ">Posts</router-link>
        </li>
        <li class=" md:mx-4 md:my-0 my-4"
        v-if="isAuthenticated">
            <a href="#" class="font-semibold hover:text-green-900" @click.prevent="onLogOut">Logout</a>
        </li>

    </ul>

</div>
</template>

<script>
import {
    mapGetters
} from 'vuex';
import {
    IS_USER_AUTHENTICATED_GETTER, LOGOUT_ACTION
} from '../store/storeconstants';
import { mapActions } from 'vuex';
export default {
    name: 'VueNavigation',

    data() {
        return {
            open: false,
        };
    },

    mounted() {

    },
    computed: {
        ...mapGetters('auth', {
            isAuthenticated: IS_USER_AUTHENTICATED_GETTER,
        })
    },

    methods: {
        MenuOpen() {
            this.open = !this.open;
        },
        ...mapActions('auth',{
            logout:LOGOUT_ACTION,
        }),
        onLogOut(){
            this.logout();
            this.$router.replace('login');
        }
    },
};
</script>

<style lang="" scoped>

</style>
