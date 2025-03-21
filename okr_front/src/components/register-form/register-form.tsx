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
    const [isValidated, setValidated] = useState(false);
    const handleSubmin = (event: React.FormEvent<HTMLFormElement>) =>{
            console.log(name.split(" "))
            if (name.split(" ").length < 3){
                setValidated(true);
                event.stopPropagation();
                return
            }
            event.preventDefault();
            try{
                props.registration(email, name, date, password);
            }catch (e: any){
                setError(e);
            }
        };
    return (
        <CustomForm id="register-form" className={`register-cont container-sm border-right border-bottom custom-rounded custom-shadow d-block p-5 ${isValidated? "was-validated": "needs-validation"}`} divClass='container d-flex justify-content-center align-items-center vh-100'
        onSubmin={handleSubmin} error={error}>
            <Input
            placehodler={"Адрес электронной почты"}
            inputType={"email"}
            classAttr={" auth-input"}
            onChange={(e) => setEmail(e.target.value)}
            className={"form-group" +' input-group'}
            invalidFeedback={'Введите корректный адресс электронной почты: example@example.com'}
            validFeedback={''}
            required={true}
            name={"email"}/>
            <Input
            placehodler={"Фамилия имя отчество"}
            inputType={"text"}
            classAttr={" auth-input"}
            onChange={(e) => setName(e.target.value)}
            className={"form-group" +' input-group'}
            invalidFeedback={'Введите Фамилию, имя и отчество корректно: Иванов Иван Иванович'}
            validFeedback={''}
            required={true}
            name={"Fio"}/>
            <Input
            placehodler={"Дата рождения"}
            inputType={"Date"}
            classAttr={" auth-input"}
            onChange={(e) => setDate(e.target.value)}
            className={"form-group" + ' input-group'}
            invalidFeedback={'Введите дату рождения!'}
            validFeedback={''}
            required={true}
            name={"Bithdate"}/>
            <Input
            placehodler={"Пароль"}
            inputType={"password"}
            classAttr={" auth-input"}
            onChange={(e) => setPassword(e.target.value)}
            className={"form-group" + ' input-group'}
            invalidFeedback={'Введите пароль'}
            validFeedback={''}
            required={true}
            name={"password"}/>
            <CustomBtn
            buttonType={"submit"}
            classAttr={"btn btn-secondary btn-auth registr-btn"}
            value={"Зарегистрироваться"}
            className={"registr-btn-cont"}
            />
        </CustomForm>
    );
}
export default Registration;