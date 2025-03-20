import BaseProps from "../Base/BasePropsInterface";
import "./input.css";
import 'bootstrap';
import TextField from "../../types/Fields"

interface inputProps extends BaseProps{
    inputType: string,
    placehodler?: string,
    classAttr?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    validFeedback?: string,
    invalidFeedback?: string,
    label?: string,
    labelClassAttr? : string,
    required: boolean
}

function CustomInput(props: inputProps){
    return (
        <div className={`${(props.className != undefined)? props.className:""}`}>
            {props.label && <label className={"label" + props.labelClassAttr? props.labelClassAttr: ""}></label>}
            <input required={props.required} type={props.inputType} className={"form-control" + props.classAttr} id={"input-" + props.placehodler} placeholder={props.placehodler} onChange={props.onChange}/>
            {props.validFeedback && <div className="valid-feedback">{props.validFeedback}</div>}
            {props.invalidFeedback && <div className="invalid-feedback">{props.invalidFeedback}</div>}
        </div>
    )
}
export default CustomInput