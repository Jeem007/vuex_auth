import Validations from "./Validations";

export default class LoginValidation{
    constructor(email,password){
        this.email = email;
        this.password = password;
    };

    checkValidations(){
        let errors = [];
        //Email
        if(!Validations.checkEmail(this.email)){
            errors['email'] = '*Email is required';
        }
        //Password
        if(!Validations.checkPassword(this.password)){
            errors['password'] = '*Password is required';
        }
        
        return errors;
    };
    static getErrorMessageFromCode(errorCode){
        switch(errorCode){
            case 'EMAIL_NOT_FOUND':
                return 'Email Not Found';
            case 'INVALID_PASSWORD':
                return 'Password Not Match! Try Again';
            case 'INVALID_LOGIN_CREDENTIALS':
                return 'Email or Password is invalid. Plase provide correct username & password'
        }
    }
}