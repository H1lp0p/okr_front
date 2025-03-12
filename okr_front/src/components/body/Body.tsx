import React, { useState } from 'react'
import './Body.css'
import UserModel from '../../models/UserModel'
import Header from '../header/Header'

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

  return (
    <>
      <Header
        user={user}
        logout={logout}/>

      <span>Мы делаем фронт, честно</span><br/>
      <button
      className='btn btn-primary' 
      onClick={(event) => {login("a", "b")}}>Тестовый login</button>
    </>
  )
}

export default Body
