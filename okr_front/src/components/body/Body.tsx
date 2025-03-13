import React, { useState } from 'react'
import './Body.css'
import UserModel from '../../models/UserModel'
import Header from '../header/Header'
import RequestInfo from '../requestInfo/RequestInfo'
import RequestInfoModel from '../../models/RequstModel'
import Attachment from '../../models/Attachmet'
import { RequestStatuses, RequestTypes } from '../../types/request'

interface BodyProps{

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

      <span>Мы делаем фронт, честно</span><br/>
      <button
      className='btn btn-primary' 
      onClick={(event) => {login("a", "b")}}>Тестовый login</button>

      <div className='w-50 p-2'>
        <RequestInfo
          request={testRequest}
        />
      </div>
    </>
  )
}

export default Body
