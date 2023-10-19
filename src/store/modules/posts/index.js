import axios, * as others from 'axios';
import { ADD_POST_ACTION } from '../../storeconstants';
const state={

};
const mutations={

};
const getters={

};
const actions={
/* Add Post Action */
async [ADD_POST_ACTION](context,payload){
    let PostData = {
        title: payload.title,
        description:payload.description,
    };
    let response = '';
    try{
        response = await axios.post(`https://vuex-auth-b9e93-default-rtdb.firebaseio.com/posts.json`,PostData)
    }catch(err){
        console.warn("Something Went Wrong");
    }

}


};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    mutations,
}
