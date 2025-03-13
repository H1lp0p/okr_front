import UserModel from '../../models/UserModel';
import Input from '../inputs/input';
import Button from '../buttons/button';
import "./loginForm.css";
import 'bootstrap';


interface loginProps{
    
}

function Login(props: loginProps){
    return (
        <form id="login-form">
            <Input
            placehodler={"Адрес электронной почты"}
            inputType={"email"}
            classAttr={"form-control auth-input"}/>
            <Input
            placehodler={"Пароль"}
            inputType={"password"}
            classAttr={"form-control auth-input"}/>
            <Button
            buttonType={"submit"}
            classAttr={"btn btn-secondary btn-auth"}
            value={"Вход"}/>
        </form>
    );
}
export default Login;