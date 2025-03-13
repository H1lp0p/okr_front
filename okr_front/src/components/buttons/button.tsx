import "./button.css";
import 'bootstrap';
type ButtonType = "submit" | "reset" | "button";

interface buttonProps{
    buttonType: ButtonType,
    value: string,
    classAttr: string
}

function Button(props: buttonProps){
    return (
        <button type={props.buttonType} className={props.classAttr}>{props.value}</button>
    )
}
export default Button