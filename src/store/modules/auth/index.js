import axios, * as others from 'axios';
import { GET_USER_TOKEN_GETTER, IS_USER_AUTHENTICATED_GETTER,LOGOUT_ACTION, LOGIN_ACTION, SET_USER_TOKEN_DATA_MUTATIONS, SIGNUP_ACTION, AUTO_LOGIN_ACTION ,AUTO_LOGOUT_ACTION, SET_AUTO_LOGOUT_MUTATIONS} from "../../storeconstants";
import SignupValidation from '../../../services/SignupValidation';
import LoginValidation from '../../../services/LoginValidation';

let timer = '';
let expTimeSec = 60;
let expTimeMSec = expTimeSec * 1000;
const state = {
    idToken:'',
    email:'',
    userId:'',
    refreshToken:'',
    expiresIn:'',
    autoLogout: false,
};
const mutations = {
    [SET_USER_TOKEN_DATA_MUTATIONS](state,payload){
        state.email = payload.email;
        state.idToken = payload.idToken;
        state.expiresIn = payload.expiresIn;
        state.userId = payload.userId;
        state.refreshToken = payload.refreshToken;
        state.autoLogout = false;
    },
    [SET_AUTO_LOGOUT_MUTATIONS](state){
      state.autoLogout = true;
    },
};
const getters = {
  [GET_USER_TOKEN_GETTER]:(state) =>{
    return state.idToken;
  },
  [IS_USER_AUTHENTICATED_GETTER](state){
    return !!state.idToken;
  }
};

const actions = { 

  /* Logout */
      [LOGOUT_ACTION](context){
          context.commit(SET_USER_TOKEN_DATA_MUTATIONS,{
            email: null,
            idToken : null,   
            refreshToken: null,
            expiresIn:null,
            userId: null,
      });
      localStorage.removeItem('userData');
      if(timer){
        clearTimeout(timer);
      }
    },
  /* Login Actions */
  async [LOGIN_ACTION](context,payload){
      let postData = {
      email: payload.email,
      password: payload.password,
      returnSecureToken:true,
    
  };
  console.log(postData);
      let response = '';
      try{
        response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDE5zPlktrV-ADV55nme5os8aKa0MoqcaI`,postData);
      }
      catch(err){
      // context.commit(LOADING_SPINNER_SHOW_MUTATIONS,false,{
      //     root:true,
      // });
       let errorMsg =   LoginValidation.getErrorMessageFromCode(err.response.data.error.errors[0].message);
      //  console.log(err.response.data.error.errors[0].message);
       throw errorMsg;
  
      } 
        //console.log(response);
      
      // context.commit(LOADING_SPINNER_SHOW_MUTATIONS,false,{
      //     root:true,
      // });  
        if(response.status === 200){
          // let expirationTime = +response.data.expiresIn * 1000;
          let expirationTime = +expTimeSec* 1000;  
          timer = setTimeout(()=>{
            context.dispatch(AUTO_LOGOUT_ACTION)
          },expirationTime)

          let tokenData = {
            email: response.data.email,
            idToken : response.data.idToken,   
            refreshToken: response.data.refreshToken,
            expiresIn:expirationTime,
            userId: response.data.localId,
          };
              localStorage.setItem('userData',JSON.stringify(tokenData));
              context.commit(SET_USER_TOKEN_DATA_MUTATIONS,tokenData);
        }
      },


  /* Sign Up Action */
  async [SIGNUP_ACTION](context,payload){
        let postData = {
            email : payload.email,
            password: payload.password,
            returnSecureToken:true,
        };
    let response = '';

    //spinner
    // context.commit(LOADING_SPINNER_SHOW_MUTATIONS,true,{
    //     root:true,
    // });
    try{
      response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDE5zPlktrV-ADV55nme5os8aKa0MoqcaI`,postData);}
    catch(err){
    // context.commit(LOADING_SPINNER_SHOW_MUTATIONS,false,{
    //     root:true,
    // });
     let errorMsg =   SignupValidation.getErrorMessageFromCode(err.response.data.error.errors[0].message);
     console.log(errorMsg);
     console.log(err.response.data.error);
     throw errorMsg;

    }
      //console.log(response);
    
    // context.commit(LOADING_SPINNER_SHOW_MUTATIONS,false,{
    //     root:true,
    // });  
      if(response.status === 200){
        let expirationTime = +expTimeSec* 1000;  
          timer = setTimeout(()=>{
            context.dispatch(AUTO_LOGOUT_ACTION)
          },expirationTime)


          let tokenData = {
            email: response.data.email,
            idToken : response.data.idToken,   
            refreshToken: response.data.refreshToken,
            expiresIn:expirationTime,
            userId: response.data.localId,
            };
              localStorage.setItem('userData',JSON.stringify(tokenData));
              context.commit(SET_USER_TOKEN_DATA_MUTATIONS,tokenData);
        }
    },

    //Auto Login  after refresh
    [AUTO_LOGIN_ACTION](context){
      let userDataString = localStorage.getItem('userData');
      if(userDataString){
        let userData = JSON.parse(userDataString);
        let expirationTime = userData.expiresIn - new Date().getTime();
        //5min
        if(expirationTime < expTimeMSec){
            context.dispatch(AUTO_LOGOUT_ACTION);
        }else{
          timer = setTimeout(()=>{
            context.dispatch(AUTO_LOGOUT_ACTION);
          },expirationTime)
        }
        context.commit(SET_USER_TOKEN_DATA_MUTATIONS,userData);
      }
    },
    //Auto Log out 
    [AUTO_LOGOUT_ACTION](context){
        context.dispatch(LOGOUT_ACTION);
        context.commit(SET_AUTO_LOGOUT_MUTATIONS);
    }



};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
}
