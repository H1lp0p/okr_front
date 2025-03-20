import BaseProps from "../Base/BasePropsInterface";
import "./input.css";
import 'bootstrap';

interface inputProps extends BaseProps{
    inputType: string,
    placehodler?: string,
    classAttr?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    validFeedback?: string,
    invalidFeedback?: string,
    label?: string,
    labelClassAttr? : string,
    required: boolean,
    name?:string,
    checked?:boolean
}

function CustomInput(props: inputProps){
    return (
        <div className={`${(props.className != undefined)? props.className:""}`}>
            {props.label && <label className={"label" + props.labelClassAttr? props.labelClassAttr: ""}>{props.label}</label>}
            <input required={props.required} type={props.inputType} className={`${(props.checked != undefined)?"form-check-input":"form-control" + props.classAttr}`} id={"input-" + props.name} placeholder={props.placehodler} onChange={props.onChange} checked={props.checked}/>
            {props.validFeedback && <div className="valid-feedback">{props.validFeedback}</div>}
            {props.invalidFeedback && <div className="invalid-feedback">{props.invalidFeedback}</div>}
        </div>
    )
}
export default CustomInput