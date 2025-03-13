import UserModel from '../../models/UserModel';
import Input from '../inputs/input';
import Button from '../buttons/button';
import 'bootstrap';

interface registerProps{
}

function Registration(props: registerProps){
    return (
        <form id="register-form">
            <Input
            placehodler={"Адрес электронной почты"}
            inputType={"email"}
            classAttr={"form-control auth-input"}/>
            <Input
            placehodler={"Фамилия имя отчество"}
            inputType={"text"}
            classAttr={"form-control auth-input"}/>
            <Input
            placehodler={"Дата рождения"}
            inputType={"date"}
            classAttr={"form-control auth-input"}/>
            <Input
            placehodler={"Пароль"}
            inputType={"password"}
            classAttr={"form-control auth-input"}/>
            <Button
            buttonType={"submit"}
            classAttr={"btn btn-secondary btn-auth"}
            value={"Зарегистрироваться"}/>
        </form>
    );
}
export default Registration;