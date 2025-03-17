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


interface RequestListProps extends BaseProps{

}

function RequestList(props: RequestListProps){

    const [selectedItem, setSelected] = useState<RequestInfoModel>()

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

    const select = (newSelected: RequestInfoModel) => {
        if (selectedItem && newSelected.id == selectedItem.id){
            setSelected(undefined)
        }
        else{
            setSelected(newSelected)
        }
    }

    const editRequest = (newRequest : RequestInfoModel) => {
      setSelected(newRequest)
    }
    
    return (
        <div className={`d-flex flex-row w-100 align-self-stretch justify-content-center ${props.className}`}>
            <div className={`d-flex flex-column flex-grow-1 pe-1 me-2 card-view list-view`}>
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

            {selectedItem && 
              <RequestFull
                  className="flex-grow-1 card-view align-self-stretch p-2"
                  request={selectedItem}
                  changeRequest={editRequest}
                  maxUserRole={Roles.worker}/>
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