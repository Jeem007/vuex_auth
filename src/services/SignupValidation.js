import Validations from "./Validations";

export default class SignupValidation{
    constructor(email,password){
        this.email = email;
        this.password = password;
    };

    checkValidations(){
        let errors = [];
        //Email
        if(!Validations.checkEmail(this.email)){
            errors['email'] = '*Invalid Email';
        }
        //Password
        if(!Validations.checkPassword(this.password)){
            errors['password'] = '*Password 7-15 char should conatain atleast one special char & numeric digit';
        }
        
        return errors;
    };
    static getErrorMessageFromCode(errorCode){
        switch(errorCode){
            case 'EMAIL_EXISTS':
                return 'Email already exists';
        }
    }
}