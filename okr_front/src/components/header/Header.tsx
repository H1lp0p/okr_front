import React, {useState} from "react"
import UserInfo from "../../types/user"
import { Roles } from "../../types/user"

import './header.css'


interface HeaderProps {
    user: UserInfo
}

function Header(props: HeaderProps) {
    const [userState, setuserState] = useState(props.user) 

    console.log(userState)

    const navTabs = (userState: UserInfo) => {
        return (
        <ul className="navbar-nav">
            {userState.Roles.findIndex((val: Roles) => val == Roles.teacher) != -1 &&
            <li className="nav-intem">
                <a className="nav-link text-light">Все пропуски</a>
            </li>}
            {userState.Roles.findIndex((val: Roles) => val == Roles.worker) != -1 &&
            <li className="nav-intem">
                <a className="nav-link text-light">работнику деканата</a>
            </li>}
        </ul>)
    }

    const adjust = (str: string, maxLen = 20) => {
        return str.length > maxLen ? str.slice(0, maxLen) + "..." : str
    }

    const userProfile = (userState: UserInfo) => {
        return (
            <div className="d-flex">
                <div className="mx-2 d-flex flex-column justify-content-center text-light text-center">
                    <span>{adjust(`${userState.Name} ${userState.Surname} ${userState.Patronymic}`)}</span>
                    <span>{adjust(`${userState.Email}`)}</span>
                </div>
                <img className="btn p-2 rounded align-self-center" src="./src/resources/exit.svg"></img>
            </div>
        )
    }

    const loginRegisterbtns = () => {
        return (
            <div>
                <button className="btn btn-custom text-light">Вход</button>
                <button className="btn text-light">регистрация</button>
            </div>
        )
    }

    return (
        <nav className="navbar navbar-expand-md bg-primary">
            <div className="container-fluid d-flex justify-content-start">
                <a className="navbar-brand" href="/">
                    <img src="./src/resources/house.svg"/>
                </a>
                <div className="flex-grow-1">
                {userState.Jwt != null && 
                 navTabs(userState)   
                }
                </div>
                
                {userState.Jwt != null && userProfile(userState)}
                {userState.Jwt == null && loginRegisterbtns()}
            </div>
        </nav>
    )
}

export default Header