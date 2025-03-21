import {useState} from 'react'
import './Body.css'
import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import Login from '../login-form/LoginForm';
import Registration from '../register-form/Register-form';
import UserModel from '../../models/UserModel'
import Header from '../header/Header'
import BaseProps from '../Base/BasePropsInterface'
import RequestInfo from '../Requests/requestInfo/RequestInfo'
import RequestInfoModel from '../../models/RequstModel'
import Attachment from '../../models/Attachmet'
import {RequestStatuses, RequestTypes} from '../../types/request'
import RequestList from '../requestList/RequestList';
import Filter, {filterInterface} from '../filterForm/FilterForm';
import Edit from '../pages/edit/Edit';
import GanttTable from "../gant/gant.tsx";
import endpoint from '../../api/endpoints.ts';

interface BodyProps extends BaseProps {

}

function Body() {

  const [user, setUser] = useState(new UserModel())
  const [filterState, setFilterState] = useState<filterInterface>({})

  const logout = () => {
    user.logout().then(res => {
      setUser(() => res)
    })
  }

  const login = (email: string, password: string) => {
    user.login(email, password).then(res => {
      console.log("LOGIN", res);
        setUser(() => res);
    })
  }
  const register = (email: string, name:string, bithdate: string,  password: string) => {
    user.register(name.split(" ")[1], email, name.split(" ")[0], name.split(" ")[2], bithdate, password).then(res => {
      console.log("REGISTER", res);
      setUser(() => res);
    })
  }

  const gant = (formData:filterInterface) => {
    setFilterState(formData);
    }
      
  return (
    <>
      <Header
        user={user}
        logout={logout}/>
      <div className='list-view pb-3' style={{height: "90vh"}}>

      
        <Routes>
          <Route path="/" element={<>
            <RequestList
              className=''
              isMainPage={true}
              user={user}
            />
          </>}/>
          <Route path='/worker' element={
            <>
              <Filter 
                onSubmit={gant}
                onDownload={(filter) => {
                  console.log("export");
                  
                  endpoint.worker.export(user.Jwt!, {
                    surname: filter.surname,
                    group: filter.group,
                    subgroup: filter.subgroup,
                    favourite: filter.favourite,
                    dateStart: filter.dateStart?.toISOString().slice(0, 10),
                    dateEnd: filter.dateEnd?.toISOString().slice(0, 10)
                }).then(() => console.log("done"))
                }}
              />
              <RequestList
                className='h-75'
                isMainPage={false}
                user={user}
                filtration={filterState}
              />
            </>
            
          }/>
          <Route path='/edit' element={
            <Edit
              user={user}
            ></Edit>
          }/>
          <Route path="/login" element={
            <Login
            login={login}/>}
            />
          <Route path="/registration" element={<Registration registration={register}/>}/>
          <Route path="/gant" element={<>
            <Filter 
              onSubmit={gant}
              onDownload={() => {}}
            />
            <GanttTable
                filtration={filterState}
                jwt={user.Jwt!}
            />
          {/*
            <Filter 
              onSubmin={gant}
            />
            <SonyaComponent
              filterState={filterState}
            />
          */}
          </>}/>
        </Routes>
      </div>
    </>
  )
}

export default Body
