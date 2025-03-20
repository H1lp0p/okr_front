import { useState } from "react";
import Attachment from "../../models/Attachmet";
import RequestInfoModel from "../../models/RequstModel";
import { RequestStatuses, RequestTypes } from "../../types/request";
import BaseProps from "../Base/BasePropsInterface";
import RequestInfo from "../Requests/requestInfo/RequestInfo";

import './RequestList.css'
import RequestFull from "../Requests/RequestFull/RequestFull";
import { data } from "react-router-dom";
import { Roles } from "../../types/user";
import UserModel from "../../models/UserModel";


interface RequestListProps extends BaseProps{
  user : UserModel,
  isMainPage?: boolean
}

function RequestList(props: RequestListProps){

    const newItemId = "-1"

    const {user} = props

    const [selectedItem, setSelected] = useState<RequestInfoModel>()

    const roles = user.Roles
    
    const isMaindPage = props.isMainPage ? props.isMainPage : true

    const maxUserRole = (roles.indexOf(Roles.worker) != -1 && !isMaindPage)? Roles.worker : Roles.student
    
    console.log(maxUserRole);
    

    let testArray = [
        new RequestInfoModel(
          "id1",
          new Date(),
          new Date(),
          [
            new Attachment( "Aboba.txt", new Date()),
          ],
          "Вася Полушкин",
          ["972303", "98123", "123235"],
          RequestStatuses.inQueue,
          RequestTypes.sick
        ),
        new RequestInfoModel(
          "id2",
          new Date(),
          new Date(),
          [],
          "Вася Полушкин",
          ["972303"],
          RequestStatuses.approved,
          RequestTypes.family
        ),
        new RequestInfoModel(
          "id3",
          new Date(),
          new Date(),
          [],
          "Вася Полушкин",
          ["972303"],
          RequestStatuses.denied,
          RequestTypes.trip
        ),
        new RequestInfoModel(
          "id4",
          new Date(),
          new Date(),
          [],
          "Вася Полушкин",
          ["972303"],
          RequestStatuses.denied,
          RequestTypes.sick
        ),
        new RequestInfoModel(
          "id5",
          new Date(),
          new Date(),
          [],
          "Вася Полушкин",
          ["972303"],
          RequestStatuses.denied,
          RequestTypes.trip
        ),
        new RequestInfoModel(
          "id6",
          new Date(),
          new Date(),
          [],
          "Вася Полушкин",
          ["972303"],
          RequestStatuses.denied,
          RequestTypes.trip
        ),
        new RequestInfoModel(
          "id7",
          new Date(),
          new Date(),
          [],
          "Вася Полушкин",
          ["972303"],
          RequestStatuses.denied,
          RequestTypes.trip
        ),
        new RequestInfoModel(
          "id8",
          new Date(),
          new Date(),
          [],
          "Вася Полушкин",
          ["972303"],
          RequestStatuses.denied,
          RequestTypes.trip
        ),
        new RequestInfoModel(
          "id9",
          new Date(),
          new Date(),
          [],
          "Вася Полушкин",
          ["972303"],
          RequestStatuses.denied,
          RequestTypes.trip
        )
    ]


    //TODO: groups from back
    const select = (newSelected: RequestInfoModel) => {
        if (selectedItem && newSelected.id == selectedItem.id){
            setSelected(new RequestInfoModel(
              newItemId,
              new Date(),
              new Date(),
              [],
              `${user.Name} ${user.Surname} ${user.Patronymic}`,
              ["TODO: data from back"],
              RequestStatuses.inQueue,
              RequestTypes.sick
            ))
        }
        else{
            setSelected(newSelected)
        }
    }

    //there we need to compare selectedItem and newRequest.
    //And if we need to change dates - fetch "prolonge" request, if we need to change status - fetch "setStatus" and exc.
    const editRequest = (newRequest : RequestInfoModel) => {
      if (newRequest.id == null){

      }
      if (newRequest.endDate != selectedItem?.endDate){
        //fetch prolonge
      }
      setSelected(newRequest)
    }
    
    return (
        <div className={`d-flex flex-row w-100 align-self-stretch justify-content-center ${props.className}`}>
            <div className={`d-flex flex-column flex-grow-1 pe-1 me-2`}>

              {maxUserRole == Roles.student && <button className={`btn btn-secondary btn-lg m-4`}>Новый запрос</button>}

              <div className={`card-view list-view`}>
                  {testArray.map((el, it) => {
                      return (
                          <RequestInfo
                              onSelect={select}
                              selectedId={selectedItem? selectedItem.id : ""}
                              request={el}
                              key={`${el.id}_${it}`}
                          />
                      )
                  })}
              </div>
            </div>
            
            {/* Need to get user Roles, so transfer it throu Body (edit props of this component) */}
            {selectedItem && 
              <RequestFull
              isNew={selectedItem.id == newItemId}
                  className="flex-grow-1 card-view align-self-stretch p-2"
                  request={selectedItem}
                  changeRequest={editRequest}
                  maxUserRole={maxUserRole}/>
            }
            {!selectedItem && <PlaceHolder/>}
        </div>
    )
}

const PlaceHolder = () => {
  return (
      <div className="flex-grow-1 card-view align-self-stretch p-2 jsutify-content-center align-items-center">
          <span>Выберите запрос</span>
      </div>
  )
}

export default RequestList