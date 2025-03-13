import React, {useState} from "react"
import { Roles } from "../../types/user"
import { Link } from 'react-router-dom';
import './header.css'
import UserModel from "../../models/UserModel"


interface HeaderProps {
    user: UserModel,
    logout? : () => void | null 
}

function Header(props: HeaderProps) {

    const userState = props.user

    console.log(userState);
    

    const navTabs = (userState: UserModel) => {
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

    const logoutFunc = () => {
        if (props.logout != null){
            props.logout()
        }
    }

    const userProfile = (userState: UserModel) => {
        return (
            <div className="d-flex">
                <div className="mx-2 d-flex flex-column justify-content-center text-light text-center">
                    <span>{adjust(`${userState.Name} ${userState.Surname} ${userState.Patronymic}`)}</span>
                    <span>{adjust(`${userState.Email}`)}</span>
                </div>
                <button className="btn p-2 rounded align-self-center"
                onClick={() => {logoutFunc()}}>
                    <img className="exit" src="./src/resources/exit.svg"/>
                </button>
            </div>
        )
    }

    const loginRegisterbtns = () => {
        return (
            <div>
                <Link className="btn text-light" to="/login">Вход</Link>
                <Link className="btn text-light" to="/registration">Регистрация</Link>
            </div>
        )
    }

    return (
        <nav className="navbar navbar-expand-md bg-primary">
            <div className="container-fluid d-flex justify-content-between">
                <Link className="navbar-brand" to="/">
                    <img src="./src/resources/house.svg"/>
                </Link>
                <button className="navbar-toggler text-light justify-self-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="container-fluid d-flex flex-row">
                        <div className="flex-grow-1">
                        {userState.Jwt != null && 
                        navTabs(userState)   
                        }
                        </div>
                        
                        {userState.Jwt != null && userProfile(userState)}
                        {userState.Jwt == null && loginRegisterbtns()}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header