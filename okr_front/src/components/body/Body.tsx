import React, { useState } from 'react'
import './Body.css'
import UserModel from '../../models/UserModel'
import Header from '../header/Header'

interface BodyProps{

}

function Body() {

  const [counter, setCounter] = useState(0)
  const [user, setUser] = useState(new UserModel())

  return (
    <>
      <Header
        user={user}/>

      <span>Мы делаем фронт, честно</span><br/>
      <button onClick={(event) => {setCounter(counter + 1)}}>Count = {counter}</button>
    </>
  )
}

export default Body
