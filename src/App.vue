<template>
  <VueNavigation/>
 <TheLoader v-if="showLoading"></TheLoader>

      <div>
          <router-view></router-view>
      </div>




</template>

<script>

import VueNavigation from './components/Navigation.vue'
import TheLoader from './components/TheLoader.vue';
import {mapState} from 'vuex'
import { AUTO_LOGIN_ACTION } from './store/storeconstants';
export default {
  components:{
    VueNavigation,TheLoader
  },
    name: 'App',

    data() {
        return {

        };
    },
    computed:{
      ...mapState({
        showLoading :state => state.showLoading,
         autoLogout : state => state.auth.autoLogout
      }),
    },

    mounted() {

    },
    created(){
      this.$store.dispatch(`auth/${AUTO_LOGIN_ACTION}`)
    },
    watch:{
      autoLogout(curValue,oldValue){
        if(curValue && curValue != oldValue){
          this.$router.replace('/login');
        }
      }
    },

    methods: {

    },
};
</script>

<style scoped>

</style>
