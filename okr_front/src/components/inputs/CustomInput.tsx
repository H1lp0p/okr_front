import BaseProps from "../Base/BasePropsInterface";
import "./input.css";
import 'bootstrap';

interface inputProps extends BaseProps{
    inputType: string,
    placehodler: string,
    classAttr: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function CustomInput(props: inputProps){
    return (
        <div className={'input-group' + ` ${(props.className != undefined)? props.className:""}`}>
            <input type={props.inputType} className={props.classAttr} id={"input-" + props.inputType} placeholder={props.placehodler} onChange={props.onChange}/>
        </div>
    )
}
export default CustomInput