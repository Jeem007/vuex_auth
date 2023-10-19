import { createStore } from 'vuex';
import auth from './modules/auth'
import posts from './modules/posts'
import { LOADING_SPINNER_SHOW_MUTATIONS } from './storeconstants';


const store = createStore({
    //Modules Declare Here
    modules:{
       auth,
       posts,
      
    },
    state(){
        return{
            showLoading: false,
        }
    },
    mutations:{
        [LOADING_SPINNER_SHOW_MUTATIONS](state,payload){
            state.showLoading = payload;
        }
    }

});

export default store;