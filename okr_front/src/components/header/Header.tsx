import React, {useState} from "react"
import UserInfo from "../../types/user"


interface HeaderProps {
    user: UserInfo
}

function Header(props: HeaderProps) {
    const [userState, setuserState] = useState(props.user) 

    return (
        <nav className="navbar navbar-expand-l bg-primary">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-intem">
                        <a className="nav-link text-light">{userState.Email == null ? "Пусто!" : userState.Email}</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header