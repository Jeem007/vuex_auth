<template>
    <div class="flex justify-center items-center py-28">
        <div class="w-96 p-6 shadow-lg bg-slate-50 rounded">
              <div class="flex justify-center items-center font-semibold">
                   <h3>Create Post</h3>
                </div>
            <form @submit.prevent="onCreatePost()">
                 <span class="block text-sm font-medium text-slate-700">Title</span>
                <input type="text" id="title" placeholder="Enter Post Title"  class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" v-model="title">
    
                <span class="block text-sm font-medium text-slate-700">Description</span>
                <textarea name="description" id="description" cols="30" rows="5" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" v-model="description"></textarea>
                
                <div class="flex justify-center items-center">
                    <button class="rounded-full border border-1 px-6 py-2 mt-4 text-lime-950 font-semibold border-amber-900 hover:border-violet-700 hover:bg-lime-200 " type="button" @click="onCreatePost" >
                 Create Post</button>
                </div>
            
    
            </form>
        </div>
    </div>
 </template>
<script>
import { mapActions,mapMutations } from 'vuex';
import {ADD_POST_ACTION,LOADING_SPINNER_SHOW_MUTATIONS} from '../store/storeconstants';
export default {
    name: 'CreatePost',

    data() {
        return {
            title:'',
            description:'',
        };
    },

    mounted() {
        
    },

    methods: {
        ...mapActions('posts',{
            postCreate :ADD_POST_ACTION 
        }),
        ...mapMutations({
            showLoading: LOADING_SPINNER_SHOW_MUTATIONS
        }),

        async onCreatePost(){
            this.showLoading(true);
            await this.postCreate({
                title : this.title,
                description:this.description,
            }).catch((error)=>{
                this.showLoading(false);
            });
            this.showLoading(false);

        }
    },
};
</script>