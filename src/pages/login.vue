<template>
<div class="flex justify-center items-center py-28">
    <div class="w-96 p-6 shadow-lg bg-slate-50 rounded">
          <div class="flex justify-center items-center font-semibold">
               <h3>Login</h3>
            </div>
            <div class=" text-center font-semibold text-red-500 py-2" v-if="error">{{ error }}</div>
        <form @submit.prevent="onLogin()">
             <span class="block text-sm font-medium text-slate-700">Email</span>
            <input type="email" id="email" placeholder="Enter your Email"  class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" v-model.trim="email" />
            <div>
                <span class=" text-red-800 font-semibold"> {{ errors.email }}</span>
            </div>

            <span class="block text-sm font-medium text-slate-700">Password</span>
            <input type="password" id="password" placeholder="Enter your Password"  class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" v-model.trim="password" />
            <div>
                <span class=" text-red-800 font-semibold"> {{ errors.password  }}</span>
            </div>
            <div class="flex justify-center items-center">
                <button class="rounded-full border border-1 px-6 py-2 mt-4 text-lime-950 font-semibold border-amber-900 hover:border-violet-700 hover:bg-lime-200 " type="button" @click="onLogin">
                  Login</button>
            </div>
        

        </form>
    </div>
</div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import LoginValidation from '../services/LoginValidation'
import { LOADING_SPINNER_SHOW_MUTATIONS, LOGIN_ACTION } from '../store/storeconstants';
export default {
    name: 'AuthLogin',

    data() {
        return {
            email: '',
            password:'',
            errors:[],
            error:'',
        };
    },

    mounted() {

    },

    methods: {
        ...mapActions('auth',{
            login: LOGIN_ACTION,
        }),
        ...mapMutations({
            showLoading: LOADING_SPINNER_SHOW_MUTATIONS
        }),

       async onLogin(){
            // Check Validation
            let Validation = new LoginValidation(this.email,this.password);

            this.errors = Validation.checkValidations();
            if ('email' in this.errors || 'password' in this.errors){
                return false;
            }
            //Spinner
            this.showLoading(true);
            //login Check
            try{
            await this.login({
                email:this.email,
                password:this.password});
               //redirect when login
               this.$router.push('posts');
              
                
            }catch(e){
                this.error = e;
                this.showLoading(false);
            }
            this.showLoading(false);
            
            //redirect when login
            // this.$router.push('posts');
            },
    },
    computed:{
       

    }
};
</script>
