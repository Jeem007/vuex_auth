export default class Validations{
    static checkEmail(email){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        {
          return (true)
        }
        else{
            return false
        };
    }

    static minLength(name,minLength){
        if(name.length < minLength){
            return false;
        }
        else{
            return true;
        };
    }

    static checkPassword(password){
        var paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if(password.match(paswd)) 
        { 
        return true;
        }else{
            return false;
        }

    }
}