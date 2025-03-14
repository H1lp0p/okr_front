import Input from '../inputs/CustomInput';
import CustomBtn from '../buttons/CustomBtn';
import BaseProps from '../Base/BasePropsInterface';
import CustomForm from '../form/CustomForm';
import "./Register-form.css";
import { useState } from 'react';

interface registerProps extends BaseProps{
    registration: (email: string, name:string, bithdate: string,  password: string) => void;
}

function Registration(props: registerProps){
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleSubmin = (event: React.FormEvent<HTMLFormElement>) =>{
            event.preventDefault();
            try{
                props.registration(email, name, date, password);
            }catch (e: any){
                setError(e);
            }
        };
    return (
        <CustomForm id="register-form" className='register-cont container-sm border-right border-bottom custom-rounded custom-shadow d-block p-5' divClass='container d-flex justify-content-center align-items-center vh-100'
        onSubmin={handleSubmin} error={error}>
            <Input
            placehodler={"Адрес электронной почты"}
            inputType={"email"}
            className={'input-group'}
            classAttr={"form-control auth-input"}
            onChange={(e) => setEmail(e.target.value)}/>
            <Input
            placehodler={"Фамилия имя отчество"}
            inputType={"text"}
            className={'input-group'}
            classAttr={"form-control auth-input"}
            onChange={(e) => setName(e.target.value)}/>
            <Input
            placehodler={"Дата рождения"}
            inputType={"Date"}
            className={'input-group'}
            classAttr={"form-control auth-input"}
            onChange={(e) => setDate(e.target.value)}/>
            <Input
            placehodler={"Пароль"}
            inputType={"password"}
            className={'input-group'}
            classAttr={"form-control auth-input"}
            onChange={(e) => setPassword(e.target.value)}/>
            <CustomBtn
            buttonType={"submit"}
            classAttr={"btn btn-secondary btn-auth registr-btn"}
            value={"Зарегистрироваться"}
            className={"registr-btn-cont"}/>
        </CustomForm>
    );
}
export default Registration;