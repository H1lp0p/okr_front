import { useState } from 'react'
import './Body.css'
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from '../login-form/LoginForm';
import Registration from '../register-form/register-form';
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
      console.log("LOGIN", res);
        setUser(prewUser => res);
    })
  }
  const register = (email: string, name:string, bithdate: string,  password: string) => {
    user.register(name.split(" ")[1], email, name.split(" ")[0], name.split(" ")[2], bithdate, password).then(res => {
      console.log("REGISTER", res);
      setUser(prewUser => res);
    })
  }

  return (
    <>
      <Header
        user={user}
        logout={logout}/>
      <Routes>
        <Route path="/" element={<>
          <RequestList
            className=''
            isMainPage={true}
            user={user}
          />

        </>}/>
        <Route path='/worker' element={
          <RequestList
          className=''
          isMainPage={false}
          user={user}
        />
        }/>
        <Route path="/login" element={<Login login={login}/>}/>
        <Route path="/registration" element={<Registration registration={register}/>}/>
      </Routes>
    </>
  )
}

export default Body
