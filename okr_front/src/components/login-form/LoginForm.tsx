import React, {useState} from 'react';
import Input from '../inputs/CustomInput';
import CustomBtn from '../buttons/CustomBtn';
import BaseProps from '../Base/BasePropsInterface';
import CustomForm from '../form/CustomForm';
import UserModel from '../../models/UserModel';
import "./LoginForm.css";


interface loginProps extends BaseProps{
    login:(username:string, password:string) => void;
}

function Login(props: loginProps){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmin = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        try{
            props.login(email, password);
        }catch (e: any){
            setError(e);
        }
    };
    return (
        <CustomForm id='login-form' className='login-cont container-sm border-right border-bottom custom-rounded custom-shadow d-block p-5'
         divClass='container d-flex justify-content-center align-items-center vh-100' onSubmin={handleSubmin} error={error}>
            <Input
            placehodler={"Адрес электронной почты"}
            inputType={"email"}
            classAttr={"form-control auth-input"}
            onChange={(e) => setEmail(e.target.value)}/>
            <Input
            placehodler={"Пароль"}
            inputType={"password"}
            classAttr={"form-control auth-input"}
            onChange={(e) => setPassword(e.target.value)}/>
            <CustomBtn
            buttonType={"submit"}
            classAttr={"btn btn-secondary btn-auth login-btn"}
            value={"Вход"}
            className={"login-btn-cont"}/>
        </CustomForm>
    );
}
export default Login;