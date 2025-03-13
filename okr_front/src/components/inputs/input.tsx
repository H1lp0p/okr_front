import "./input.css";
import 'bootstrap';

interface inputProps{
    inputType: string,
    placehodler: string,
    classAttr: string
}

function Input(props: inputProps){
    return (
        <div className='input-group'>
            <input type={props.inputType} className={props.classAttr} id={"input-" + props.inputType} placeholder={props.placehodler}/>
        </div>
    )
}
export default Input