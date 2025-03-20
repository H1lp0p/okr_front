import React, {useState} from 'react';
import Input from '../inputs/CustomInput';
import CustomBtn from '../buttons/CustomBtn';
import BaseProps from '../Base/BasePropsInterface';
import CustomForm from '../form/CustomForm';
import "./LoginForm.css";


interface loginProps extends BaseProps{
    login:(username:string, password:string) => void;
}

function Login(props: loginProps){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isValidated, setValidated] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        const target = event.target as HTMLInputElement;
        if (target.checkValidity()){
            setValidated(true);
            try{
                props.login(email, password);
            }catch (e: any){
                setError(e);
            }
        }
    };
    return (
        <CustomForm id='login-form' className={`login-cont container-sm border-right border-bottom custom-rounded custom-shadow d-block p-5 ${isValidated? "was-validated": "needs-validation"}`}
         divClass='container d-flex justify-content-center align-items-center vh-100' onSubmin={(event) => handleSubmit(event)} error={error}>
            <Input
            placehodler={"Адрес электронной почты"}
            inputType={"email"}
            classAttr={" auth-input"}
            onChange={(e) => setEmail(e.target.value)}
            className={"form-group" + ' input-group'}
            invalidFeedback={'Введите корректный адресс электронной почты: example@example.com'}
            validFeedback={''}
            required={true}/>
            <Input
            placehodler={"Пароль"}
            inputType={"password"}
            classAttr={" auth-input"}
            onChange={(e) => setPassword(e.target.value)}
            className={"form-group" + ' input-group'}
            invalidFeedback={'Введите пароль'}
            validFeedback={''}
            required={true}/>
            <CustomBtn
            buttonType={"submit"}
            classAttr={"btn btn-secondary btn-auth login-btn"}
            value={"Вход"}
            className={"login-btn-cont"}/>
        </CustomForm>
    );
}
export default Login;