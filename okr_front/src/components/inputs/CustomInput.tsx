import { ReactElement } from "react";
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
    checkBoxHtml?: ReactElement,
    required: boolean,
    name?:string,
    checked?:boolean
}

function CustomInput(props: inputProps){
    return (
        <div className={`${(props.className != undefined)? props.className:""}`}>
            {props.label && <label className={"label " + props.labelClassAttr? props.labelClassAttr: ""}>
                {(props.checkBoxHtml != undefined)? props.checkBoxHtml:""}
                {props.label}
            </label>}
            <input required={props.required} type={props.inputType} className={`${(props.checked != undefined)?"form-check-input":"form-control"}` + props.classAttr} id={"input-" + (props.name != undefined? props.name: props.id != undefined? props.id: props.inputType + props.name)} placeholder={props.placehodler} onChange={props.onChange} checked={props.checked} name={props.name}/>
            {props.validFeedback && <div className="valid-feedback">{props.validFeedback}</div>}
            {props.invalidFeedback && <div className="invalid-feedback">{props.invalidFeedback}</div>}
        </div>
    )
}
export default CustomInput