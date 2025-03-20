import { ChangeEvent, useState } from "react";
import BaseProps from "../Base/BasePropsInterface";
import "./FilterForm.css";
import CustomForm from "../form/CustomForm";
import Input from "../inputs/CustomInput"

interface filterInterface{
    surname: string,
    group: string,
    subgroup: string,
    favourite: boolean,
    dateStart: Date,
    dateEnd: Date,
}

interface filterProps extends BaseProps{
    onSubmin: (formData:filterInterface) => void;
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
        handleChange(event)
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        const target = event.target as HTMLInputElement;
        if (target.checkValidity()){
            setValidated(true);
            try{
            }catch (e: any){
                setError(e);
            }
        }
    };

    return (
        <CustomForm
        id='filter-form' className={`filter-cont container-lg border-right border-bottom custom-rounded custom-shadow d-flex flex-column gap-3 p-5 ${isValidated? "was-validated": "needs-validation"}`}
        divClass='' onSubmin={(event) => handleSubmit(event)} error={error}>
            <div className="d-flex flex-row">
                <Input
                inputType={"text"}
                placehodler={"Фамилия"}
                classAttr={" filterInput"}
                onChange={handleChange}
                validFeedback={""}
                invalidFeedback={"Введите корректное значение"}
                required={false}
                name={"name"}
                />
                <Input
                inputType={"text"}
                placehodler={"Группа"}
                classAttr={" filterInput"}
                onChange={handleChange}
                validFeedback={""}
                invalidFeedback={"Введите корректное значение"}
                required={false}
                name={"group"}
                />
                <Input
                inputType={"text"}
                placehodler={"Подгруппы (названия подгрупп следует вводить через запятую)"}
                classAttr={" filterInput"}
                onChange={handleChange}
                validFeedback={""}
                invalidFeedback={"Введите подгруппы через запятую"}
                required={false}
                name={"subgroups"}
                />
                <Input
                inputType={"checkbox"}
                classAttr={""}
                checked={isChecked}
                onChange={handleChecked}
                required={false}
                name={"favourite"}
                className="form-check"
                label="Любимые группы"/>
            </div>
            <div className="d-flex flex-row">
                <Input
                inputType={"Date"}
                classAttr={" filterInput"}
                onChange={handleChange}
                required={false}
                invalidFeedback={'Введите корректное значение: дд.мм.гг!'}
                validFeedback={''}
                name={"dateStart"}
                />
                <Input
                inputType={"Date"}
                classAttr={" filterInput"}
                onChange={handleChange}
                required={false}
                name={"dateEnd"}
                invalidFeedback={'Введите корректное значение: дд.мм.гг!'}
                validFeedback={''}
                />
            </div>
        </CustomForm>
    );
}
export default Filter;
export type {filterInterface};