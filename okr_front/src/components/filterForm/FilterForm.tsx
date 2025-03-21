import { ChangeEvent, useState } from "react";
import BaseProps from "../Base/BasePropsInterface";
import "./FilterForm.css";
import CustomForm from "../form/CustomForm";
import Input from "../inputs/CustomInput"

interface filterInterface{
    surname?: string,
    group?: string,
    subgroup?: string,
    favourite?: boolean,
    dateStart?: Date,
    dateEnd?: Date,
}

interface filterProps extends BaseProps{
    onSubmit: (formData:filterInterface) => void;
    onDownload: (formData: filterInterface) => void;
}

function Filter(props: filterProps){
    const [formData, setFormData] = useState<filterInterface>({
        surname: '',
        group: '',
        subgroup: '',
        favourite: false,
        dateStart: new Date(),
        dateEnd: new Date(),
    })
    const [error, setError] = useState('');
    const [isValidated, setValidated] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value, });
    };

    const handleChecked = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setIsChecked((event.target as HTMLInputElement).checked)
        setFormData({...formData, ["favourite"]:(event.target as HTMLInputElement).checked})
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        const target = event.target as HTMLInputElement;
        if (target.checkValidity()){
            setValidated(true);
            try{
                console.log(formData)
                props.onSubmit(formData);
            }catch (e: any){
                setError(e);
            }
        }
    };
    const handleDownload = () => {
        try{
            console.log(formData)
            props.onDownload(formData);
        }catch(e: any){
            setError(e);
        }
    }

    return (
        <CustomForm
        id='filter-form' className={`filter-cont container-lg border-right border-bottom custom-rounded custom-shadow d-flex flex-column gap-3 ${isValidated? "was-validated": "needs-validation"}`}
        divClass='' onSubmin={(event) => handleSubmit(event)} error={error}>
            <div className="d-flex flex-row mb-1 align-items-center">
                <span className="row-title first">Студенты</span>
                <Input
                inputType={"text"}
                placehodler={"Фамилия"}
                classAttr={" filterInput leftRadius"}
                onChange={handleChange}
                validFeedback={""}
                invalidFeedback={"Введите корректное значение"}
                required={false}
                name={"surname"}
                className={"first-string-input"}
                />
                <Input
                inputType={"text"}
                placehodler={"Группа"}
                classAttr={" filterInput noRadius"}
                onChange={handleChange}
                validFeedback={""}
                invalidFeedback={"Введите корректное значение"}
                required={false}
                name={"group"}
                className={"first-string-input"}
                />
                <Input
                inputType={"text"}
                placehodler={"Подгруппы (названия подгрупп следует вводить через запятую)"}
                classAttr={" filterInput rightRadius"}
                onChange={handleChange}
                validFeedback={""}
                invalidFeedback={"Введите подгруппы через запятую"}
                required={false}
                name={"subgroup"}
                className={"first-string-input"}
                />
                <Input
                inputType={"checkbox"}
                classAttr={" custom-check-box"}
                checked={isChecked}
                onChange={handleChecked}
                required={false}
                name={"favourite"}
                className="form-check ms-5"
                label="Любимые группы"
                labelClassAttr="d-contents ms-3"/>
            </div>
            <div className="d-flex flex-row align-items-center">
                <span className="row-title second">Даты</span>
                <Input
                inputType={"Date"}
                classAttr={" filterInput leftRadius dateInput"}
                onChange={handleChange}
                required={false}
                invalidFeedback={'Введите корректное значение: дд.мм.гг!'}
                validFeedback={''}
                name={"dateStart"}
                className={"date-cont"}
                />
                <Input
                inputType={"Date"}
                classAttr={" filterInput rightRadius dateInput"}
                onChange={handleChange}
                required={false}
                name={"dateEnd"}
                invalidFeedback={'Введите корректное значение: дд.мм.гг!'}
                validFeedback={''}
                className={"date-cont"}
                />
                <div className="ms-5 me-3">
                    <span className="help-text">/* Даты указываются</span><br/> <span className="help-text">включительно */</span>
                </div>
                <div>
                    <button type="submit" className="submin-btn ms-3"></button>
                </div>
                <div>
                    <button type="button" className="download-btn ms-3" onClick={handleDownload}></button>
                </div>
            </div>            
        </CustomForm>
    );
}
export default Filter;
export type {filterInterface};