import { useEffect, useState } from "react";
import Attachment from "../../models/Attachmet";
import RequestInfoModel from "../../models/RequstModel";
import { RequestStatuses, RequestTypes, toStatus, toType } from "../../types/request";
import BaseProps from "../Base/BasePropsInterface";
import RequestInfo from "../Requests/requestInfo/RequestInfo";

import './RequestList.css'
import RequestFull from "../Requests/RequestFull/RequestFull";
import { data } from "react-router-dom";
import { Roles } from "../../types/user";
import UserModel from "../../models/UserModel";
import endpoint from "../../api/endpoints";
import FiltrationInterface from "../../types/filtraton";
import { filterInterface } from "../filterForm/FilterForm";


interface RequestListProps extends BaseProps{
  user : UserModel,
  isMainPage?: boolean,
  filtration?: filterInterface
}

interface Pagination{
  pageIndex: number,
  pageSize: number
}

function RequestList(props: RequestListProps){

    const newItemId = "-1"

    const {user} = props

    const [selectedItem, setSelected] = useState<RequestInfoModel>()

    const roles = user.Roles
    
    const isMainPage = props.isMainPage != undefined ? props.isMainPage : true

    const maxUserRole = (roles.indexOf(Roles.worker) != -1 && !isMainPage)? Roles.worker : Roles.student

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


    const [array, setArray] = useState(testArray)

    
    const select = (newSelected: RequestInfoModel) => {
        if (selectedItem && newSelected.id == selectedItem.id){
            setSelected(undefined)
            setArray(array.filter((el) => { return el.id != newItemId}))
        }
        else{
            setSelected(newSelected)
            setArray(array.filter((el) => { return el.id != newItemId}))
        }
    }

    //TODO: groups from back
    const addNewRequest = () => {
      if (array.findIndex((el) => {return el.id == newItemId}) == -1){
        let newReq = new RequestInfoModel(
          newItemId,
          new Date(),
          new Date(),
          [],
          `${user.Name} ${user.Surname}`,
          [user.GroupName == null? user.GroupName! : "нет"],
          RequestStatuses.inQueue,
          RequestTypes.sick
        )

        setSelected(newReq)
        setArray([newReq, ...array])
      }
    }

    //there we need to compare selectedItem and newRequest.
    //And if we need to change dates - fetch "prolonge" request, if we need to change status - fetch "setStatus" and exc.
    const editRequest = (newRequest : RequestInfoModel) => {
      if (newRequest.id == newItemId){
        endpoint.request.add(user.Jwt!, newRequest).then(res => {
          console.log("---------end--------");
          
        })
      }
      if (newRequest.endDate != selectedItem?.endDate){
        //fetch prolonge
      }
      setSelected(newRequest)
    }

    const filtration = props.filtration ? props.filtration : {} as filterInterface

    const [currentPage, setPage] = useState(0)
    const [pageSize, setSize] = useState(10)

    const [currentData, setData] = useState<RequestInfoModel[]>([])

    const [itemsCount, setCount] = useState(0)

    const [isLoading, setLoading] = useState(false)

    const [pageLoading, setPageLoading] = useState(false)

    const [isMyFetching,setIsFetchingDown]=useState(false)

    const scrollHandler = (e: any) : void => {
      const target = e.target as HTMLElement;
      
      if (!target || !target.scrollHeight) return;

      const currentScrollTop = target.scrollTop;
      const scrollHeight = target.scrollHeight;
      const clientHeight = target.clientHeight;

      //console.log("SCROLL", currentScrollTop, scrollHeight, clientHeight);

      if (scrollHeight - currentScrollTop - clientHeight < 50) {
        const scrollPosition = currentScrollTop;
        
        setIsFetchingDown(true);

        const newScrollHeight = target.scrollHeight;
        const newScrollTop = scrollPosition + (newScrollHeight - scrollHeight);
        
        target.scrollTop = newScrollTop;
      }
    }

    useEffect(() => {
      if (isMyFetching){
        
        //console.log("DOWN");
        
        if (currentPage + 1 < itemsCount){
          //console.log("awailable");
          
          setPage(prew => {
            prew += 1
            return prew
          })
        }

        setIsFetchingDown(false)
      }
    }, [isMyFetching])

    useEffect(() => {
      //console.log("UPDATE");
      
      setPageLoading(true)
      console.log(currentPage);
      
      if (isMainPage){
        endpoint.request.getMy(user.Jwt!, {page: currentPage, pageSize: pageSize}).then(result => {
          let pagination = result.paginationDto
          console.log(pagination);
          let data = result.requests
  
          let arrayOfRequests : RequestInfoModel[] = data.map((el: any) => {
            let attachments = el.confirmationFiles
  
            let atts:Attachment[] = []
  
            atts = attachments.map((att: any) => {
              return new Attachment(att.name,
                new Date(att.attachDate),
                undefined,
                el.id
              )
            })
  
            return new RequestInfoModel(
              el.id,
              new Date(el.startDate),
              new Date(el.endDate),
              atts,
              `${el.creator.name} ${el.creator.surname}`,
              [el.creator.groupName],
              toStatus(el.status),
              toType(el.type)
            )
          })
  
          let newArray = [...currentData, ...arrayOfRequests]
  
          setData(newArray)
          console.log(newArray);
          
          setPageLoading(false)
        })
      }
      else{
        endpoint.worker.getRequests(user.Jwt!, filtration, {page: currentPage, pageSize: pageSize}).then(result => {
          let pagination = result.paginationDto
          console.log(pagination);
          let data = result.requests
  
          let arrayOfRequests : RequestInfoModel[] = data.map((el: any) => {
            let attachments = el.confirmationFiles
  
            let atts:Attachment[] = []
  
            atts = attachments.map((att: any) => {
              return new Attachment(att.name,
                new Date(att.attachDate),
                undefined,
                el.id
              )
            })
  
            return new RequestInfoModel(
              el.id,
              new Date(el.startDate),
              new Date(el.endDate),
              atts,
              `${el.creator.name} ${el.creator.surname}`,
              [el.creator.groupName],
              toStatus(el.status),
              toType(el.type)
            )
          })
  
          let newArray = [...currentData, ...arrayOfRequests]
  
          setData(newArray)
          console.log(newArray);
          
          setPageLoading(false)
        })
      }
      
    }, [currentPage])

    useEffect(() => {
      setLoading(true)

      if (isMainPage){
        endpoint.request.getMy(user.Jwt!, {page: currentPage, pageSize: pageSize}).then(result => {
          let pagination = result.paginationDto
        console.log(pagination);
        
        let data = result.requests

        let arrayOfRequests : RequestInfoModel[] = data.map((el: any) => {
          let attachments = el.confirmationFiles

          let atts:Attachment[] = []

          atts = attachments.map((att: any) => {
            return new Attachment(att.name,
              new Date(att.attachDate),
              undefined,
              el.id
            )
          })

          return new RequestInfoModel(
            el.id,
            new Date(el.startDate),
            new Date(el.endDate),
            atts,
            `${el.creator.name} ${el.creator.surname}`,
            [el.creator.groupName],
            toStatus(el.status),
            toType(el.type)
          )
        })

        setData(arrayOfRequests)

        setCount(pagination.count)
        console.log(itemsCount);
        

        console.log(arrayOfRequests);
        setLoading(false)
        })
      }
      else{
        endpoint.worker.getRequests(user.Jwt!, filtration, {page: currentPage, pageSize: pageSize}).then(result => {
          let pagination = result.paginationDto
          console.log(pagination);
          
          let data = result.requests
  
          let arrayOfRequests : RequestInfoModel[] = data.map((el: any) => {
            let attachments = el.confirmationFiles
  
            let atts:Attachment[] = []
  
            atts = attachments.map((att: any) => {
              return new Attachment(att.name,
                new Date(att.attachDate),
                undefined,
                el.id
              )
            })
  
            return new RequestInfoModel(
              el.id,
              new Date(el.startDate),
              new Date(el.endDate),
              atts,
              `${el.creator.name} ${el.creator.surname}`,
              [el.creator.groupName],
              toStatus(el.status),
              toType(el.type)
            )
          })
  
          setData(arrayOfRequests)
  
          setCount(pagination.count)
          console.log(itemsCount);
          
  
          console.log(arrayOfRequests);
          setLoading(false)
        })
      }
      
    }, [])

    // useEffect(() => {
    //   setLoading(true)
    //   endpoint.worker.getRequests(user.Jwt!, filtration, {page: currentPagination.pageIndex, pageSize: currentPagination.pageSize}).then(result => {
    //     let pagination = result.paginationDto
    //     let data = result.requests

    //     let arrayOfRequests = data.map((el: any) => {
    //       let attachments = el.confirmationFiles

    //       let atts:Attachment[] = []

    //       atts = attachments.map((att: any) => {
    //         return new Attachment(att.name,
    //           new Date(att.attachDate),

    //         )
    //       })

    //       return new RequestInfoModel(
    //         el.id,
    //         el.startDate,
    //         el.endDate,
    //         atts,
    //         el.creator.name,
    //         [el.creator.groupName],
    //         el.status,
    //         el.type
    //       )
    //     })

    //     setPagination(pagination)
    //     setData(arrayOfRequests)

    //     console.log(arrayOfRequests);
    //   })
    // }, [filtration])

    return (
        <div className={`d-flex flex-row p-4 w-100 align-self-stretch justify-content-center ${props.className}`}>
            <div className={`d-flex flex-column flex-grow-1 pe-1 me-2`}>

              {maxUserRole == Roles.student && <button className={`btn btn-secondary btn-lg m-4`} onClick={() => {addNewRequest()}}>Новый запрос</button>}

              <div className={`card-view list-view`} onScroll={scrollHandler}>
                  {!isLoading && 
                    <>
                      {currentData.map((el, it) => {
                        return (
                          <>
                            <RequestInfo
                                className={`${it == currentData.length - 1 ? "pb-4" : ""}`}
                                onSelect={select}
                                selectedId={selectedItem? selectedItem.id : ""}
                                request={el}
                                key={`${el.id}_${it}`}
                            />
                          </>
                            
                        )
                      })}
                      {pageLoading && <div className={`w-100 py-3 text-center text-secondary h6`}>Подгружаем...</div>}
                    </>
                    }
                  {isLoading && 
                  <div className={`w-100 text-center py-3 text-secondary h6`}>Загрузка...</div>
                  }
              </div>
            </div>
            
            {/* Need to get user Roles, so transfer it throu Body (edit props of this component) */}
            {selectedItem && 
              <RequestFull
              isNew={selectedItem.id == newItemId}
                  className="flex-grow-1 align-self-stretch p-2"
                  request={selectedItem}
                  changeRequest={editRequest}
                  maxUserRole={!isMainPage && user.Roles.indexOf(Roles.worker) != -1? Roles.worker : Roles.student}/>
            }
            {!selectedItem && <PlaceHolder/>}
        </div>
    )
}

const PlaceHolder = () => {
  return (
      <div className="flex-grow-1 align-self-stretch p-2 d-flex flex-column justify-content-center">
          <div className="h3 align-self-center text-secondary">Выберите запрос</div>
          <div className="h3 align-self-center text-secondary">или создайте новый</div>
      </div>
  )
}

export default RequestList