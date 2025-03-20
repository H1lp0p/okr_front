import {useState} from 'react'
import './Body.css'
import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import Login from '../login-form/LoginForm';
import Registration from '../register-form/register-form';
import UserModel from '../../models/UserModel'
import Header from '../header/Header'
import BaseProps from '../Base/BasePropsInterface'
import RequestInfo from '../Requests/requestInfo/RequestInfo'
import RequestInfoModel from '../../models/RequstModel'
import Attachment from '../../models/Attachmet'
import {RequestStatuses, RequestTypes} from '../../types/request'
import RequestList from '../requestList/RequestList';
import Filter, {filterInterface} from '../filterForm/FilterForm';
import endpoint from '../../api/endpoints';
import GanttTable from "../gant/gant.tsx";

interface BodyProps extends BaseProps {

}

function Body() {

  const [user, setUser] = useState(new UserModel())
  const [filterState, setFilterState] = useState<filterInterface>()

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

  const gant = (formData:filterInterface) => {
      setFilterState(formData);
    }

  // Типы для данных
    type Request = {
        startDate: string;
        endDate: string;
        type: string;
    };

    type Student = {
        surname: string;
        name: string;
        patronymic: string;
        requests: Request[];
    };

    type Group = {
        groupName: string | null;
        students: Student[];
    };

    type Data = {
        groups: Group[];
    };


    const data: Data = {
        "groups": [
            {
                "groupName": "zalupaKonya",
                "students": [
                    {
                        "surname": "string",
                        "name": "string",
                        "patronymic": "string",
                        "requests": [
                            {
                                "startDate": "2025-03-16",
                                "endDate": "2025-03-16",
                                "type": "FAMILY"
                            },
                            {
                                "startDate": "2025-03-16",
                                "endDate": "2025-03-16",
                                "type": "SICK"
                            },
                            {
                                "startDate": "2025-03-17",
                                "endDate": "2025-03-17",
                                "type": "FAMILY"
                            },
                            {
                                "startDate": "2025-03-17",
                                "endDate": "2025-03-17",
                                "type": "FAMILY"
                            },
                            {
                                "startDate": "2025-03-17",
                                "endDate": "2025-03-17",
                                "type": "FAMILY"
                            },
                            {
                                "startDate": "2025-03-17",
                                "endDate": "2025-03-17",
                                "type": "FAMILY"
                            }
                        ]
                    }
                ]
            },
            {
                "groupName": null,
                "students": [
                    {
                        "surname": "ramiel",
                        "name": "ramiel",
                        "patronymic": "ramiel",
                        "requests": []
                    },
                    {
                        "surname": "Ядп",
                        "name": "Алекс",
                        "patronymic": "Дм",
                        "requests": []
                    },
                    {
                        "surname": "f",
                        "name": "f",
                        "patronymic": "f",
                        "requests": []
                    },
                    {
                        "surname": "Ivchenko",
                        "name": "Ivan",
                        "patronymic": "Ivanovich",
                        "requests": []
                    },
                    {
                        "surname": "Kovalenko",
                        "name": "Sofya",
                        "patronymic": "Alekseevna",
                        "requests": []
                    },
                    {
                        "surname": "string1@gmail.com",
                        "name": "string1@gmail.com",
                        "patronymic": "string1@gmail.com",
                        "requests": []
                    },
                    {
                        "surname": "ramiel",
                        "name": "ramiel",
                        "patronymic": "ramiel",
                        "requests": []
                    },
                    {
                        "surname": "string11@gmail.com",
                        "name": "string11@gmail.com",
                        "patronymic": "string11@gmail.com",
                        "requests": []
                    }
                ]
            }
        ]
    };
      
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
          <>
            <Filter 
              onSubmin={gant}
            />
            <RequestList
              className='h-75'
              isMainPage={false}
              user={user}
              filtration={filterState}
            />
          </>
          
        }/>
        <Route path="/login" element={
          <Login
          login={login}/>}
          />
        <Route path="/registration" element={<Registration registration={register}/>}/>
        <Route path="/gant" element={<>
          <Filter 
            onSubmin={gant}
          />
          <GanttTable data={data}/>
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
    </>
  )
}

export default Body
