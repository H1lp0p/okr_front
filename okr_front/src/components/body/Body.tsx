import React, { useState } from 'react'
import './Body.css'
import { Routes, Route, Link } from 'react-router-dom';
import Login from '../login-form/loginFrom';
import Registration from '../register-form/register-form';
import UserModel from '../../models/UserModel'
import Header from '../header/Header'
import BaseProps from '../Base/BasePropsInterface'
import RequestInfo from '../requestInfo/RequestInfo'
import RequestInfoModel from '../../models/RequstModel'
import Attachment from '../../models/Attachmet'
import { RequestStatuses, RequestTypes } from '../../types/request'

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

  let testRequest = new RequestInfoModel(
    "id",
    new Date(),
    new Date(),
    [new Attachment()],
    "Вася Полушкин",
    ["972303"],
    RequestStatuses.inQueue,
    RequestTypes.sick
  )

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
        </>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/registration" element={<Registration/>}/>
      </Routes>
    </>
  )
}

export default Body
