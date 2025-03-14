import { useState } from 'react'
import './Body.css'
import { Routes, Route, Link } from 'react-router-dom';
import Login from '../login-form/LoginForm';
import Registration from '../register-form/Register-form';
import UserModel from '../../models/UserModel'
import Header from '../header/Header'
import BaseProps from '../Base/BasePropsInterface'
import RequestInfo from '../Requests/requestInfo/RequestInfo'
import RequestInfoModel from '../../models/RequstModel'
import Attachment from '../../models/Attachmet'
import { RequestStatuses, RequestTypes } from '../../types/request'
import RequestList from '../requestList/RequestList';

interface BodyProps extends BaseProps{

}

function Body() {

  const [user, setUser] = useState(new UserModel())

  const logout = () => {
    user.logout().then(res => {
      setUser(prewUser => res)
    })
  }

  const login = (email: string, password: string) => {
    user.login(email, password).then(res => {
      console.log("SET", res);
      
        setUser(prewUser => res)
    })
  }
  const register = (email: string, name:string, bithdate: string,  password: string) => {
    UserModel
  }

  return (
    <>
      <Header
        user={user}
        logout={logout}/>
      <Routes>
        <Route path="/" element={<>
          <span>Мы делаем фронт, честно</span><br/>
          <button
          className='btn btn-primary' 
          onClick={(event) => {login("a", "b")}}>Тестовый login</button>
          
          
          <RequestList
            className=''
          />

        </>}/>
        <Route path="/login" element={<Login login={login}/>}/>
        <Route path="/registration" element={<Registration registration={register}/>}/>
      </Routes>
    </>
  )
}

export default Body
