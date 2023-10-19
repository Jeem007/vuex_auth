<template>
    <div>
        <div class=" font-semibold text-green-500 text-center text-xl py-6">Post Details</div>
    </div>
<div class="flex flex-wrap">
  <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4" v-for="post in posts" :key="post.id">
    <div class="bg-white rounded-lg shadow-lg">
      <!-- Card Content -->
      <div class="p-4">
        <!-- Your card content goes here -->
        <h2 class="text-xl font-semibold text-center">{{ post.id }}</h2>
        <h2 class="text-xl font-semibold text-center text-slate-600">{{ post.title }}</h2>
        <p class=" text-justify">{{ post.description }}</p>
      </div>
    </div>
  </div>
  </div>

</template>
<script>
import  AxiosInstance  from '../services/AxiosTokenInstance';
import {mapGetters,mapMutations} from 'vuex'
import {GET_USER_TOKEN_GETTER,LOADING_SPINNER_SHOW_MUTATIONS} from '../store/storeconstants'

export default {
    name: 'PagesPosts',

    data() {
        return {
            posts:[],
        };
    },
    computed:{
        ...mapGetters('auth',{
            token: GET_USER_TOKEN_GETTER,
        }),
       
    },

    async mounted() {
      this.showLoading(true);
      await AxiosInstance.get(`https://vuex-auth-b9e93-default-rtdb.firebaseio.com/posts.json`
      ).then((response) =>{
        this.formatPosts(response.data);
        this.showLoading(false);
      }).catch(()=>{
        this.showLoading(false);
      })
    },


    methods: {
        ...mapMutations({
            showLoading: LOADING_SPINNER_SHOW_MUTATIONS
        }),

        formatPosts(posts){
            for(let key in posts){
                this.posts.push({...posts[key],id:key})
            }
            console.log(this.posts);
        }
    },
};
</script>