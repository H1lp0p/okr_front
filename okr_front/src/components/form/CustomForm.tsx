import BaseProps from "../Base/BasePropsInterface";
import "./CustomForm.css";


interface formProps extends BaseProps{
    id?: string;
    divClass?: string;
    onSubmin: (event:React.FormEvent<HTMLFormElement>) => void;
    error:string; 
}

function CustomForm(props: formProps){
    return (
        <div className={props.divClass}>
            <form onSubmit={props.onSubmin} className={props.className} id={props.id}>
                {props.error && <div className="error">{props.error}</div>}
                {props.children}
            </form>
        </div>
    )
}
export default CustomForm