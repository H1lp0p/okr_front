import BaseProps from "../Base/BasePropsInterface";
import "./button.css";
import 'bootstrap';
type ButtonType = "submit" | "reset" | "button";

interface buttonProps extends BaseProps{
    buttonType: ButtonType,
    value: string,
    classAttr: string
}

function Button(props: buttonProps){
    return (
        <div className={'button-group' + ` ${(props.className != undefined)? props.className:""}`}>
            <button type={props.buttonType} className={props.classAttr}>{props.value}</button>
        </div>
    )
}
export default Button