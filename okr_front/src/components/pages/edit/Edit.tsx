import { ChangeEvent, useEffect, useState } from "react";
import UserModel from "../../../models/UserModel";
import { Roles } from "../../../types/user";
import Modal from "react-modal";
import CustomForm from "../../form/CustomForm";
import CustomInput from "../../inputs/CustomInput";
import Button from "../../buttons/CustomBtn";
import endpoint from "../../../api/endpoints";


interface EditProps{
    user: UserModel;
}


function Edit(props: EditProps){
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [secondModalIsOpen, setSecondModalIsOpen] = useState(false);
    const [subgroupModalIsOpen, setSubgroupModalIsOpen] = useState(false);
    const [options, setOptions] = useState<{id:string, name:string, surname:string}[]>([]);
    const [filteredOptions, setFilteredOptions] = useState<{id:string, name:string, surname:string}[]>([]);
    const [userData, setUserData] = useState<{id:string, name:string, surname:string}>();
    const [groupName, setGroupName] = useState("");
    const [subGroupName, setSubGroupName] = useState("");

    useEffect(() => {
        endpoint.admin.getUsers(props.user.Jwt!).then((res) => {
            setOptions(res.map((elem:any) => {
                return {id:elem.id, name:elem.name, surname:elem.surname}
            }))
        })
    },[])

    const handleFirstInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = event.target.value;
        const filteredOptions = options.filter((option) => {
            return (option.name!.toLowerCase().includes(val.toLowerCase()) || option.surname!.toLowerCase().includes(val.toLowerCase())) && val != "";
        })
        setFilteredOptions(filteredOptions)
    };

    const handleSecondInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = event.target.value;
        const filteredOptions = options.filter((option) => {
            return (option.surname!.toLowerCase().includes(val.toLowerCase()) || option.name!.toLowerCase().includes(val.toLowerCase())) && val != "";
        })
        setFilteredOptions(filteredOptions)
    };

    const openModal = () => {
        setModalIsOpen(true);
        setFilteredOptions(options);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setFilteredOptions([])
    };

    const openSecondModal = () => {
        setSecondModalIsOpen(true);
    }
    const closeSecondModal = () => {
        setSecondModalIsOpen(false);
        setFilteredOptions([])
    }
    const handleSubmit = () => {
        try{
            endpoint.tools.addTeacher(props.user.Jwt!, userData!.id);
            closeSecondModal();
        }catch (e: any){
            setError(e);
        }
    }
    const handleClick = (name:string, surname:string, id:string) => {;
        setUserData({id, name, surname})
        openSecondModal();
        
    }
    const [error, setError] = useState('');
    const addTeacher = () => {
        openModal();
    }
    const openSubGroupModal = () =>{
        setSubgroupModalIsOpen(true);
    }
    const addSubGroup = () => {
        openSubGroupModal();
    }
    const closeSubGroupModal = () => {
        setSubgroupModalIsOpen(false);
    };

    const handleGroupNameInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = event.target.value;
        setGroupName(val);
    }
    const handleSubGroupNameInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = event.target.value;
        setSubGroupName(val);
    }
    const handleAddSubgroup = () => {
        console.log(groupName, subGroupName)
        if (groupName != "" && subGroupName != ""){
           try{
                endpoint.tools.addSubGroup(props.user.Jwt!, subGroupName, groupName);
                closeSubGroupModal();
           }catch(e: any){
            setError(e);
            }
        }
    }
    return (
    <>
        <div>
            <button onClick={addTeacher}>Добавить учителя</button>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                <CustomInput
                    inputType="text"
                    placehodler="Введите имя пользователя"
                    classAttr=""
                    onChange={handleFirstInputChange}
                    required={false}
                    ></CustomInput>
                    <CustomInput
                    inputType="text"
                    placehodler="Введите фамилию пользователя"
                    classAttr=""
                    onChange={handleSecondInputChange}
                    required={false}
                ></CustomInput>
                <button className="btn btn-danger" onClick={closeModal}>Закрыть</button>
                <div>
                    {filteredOptions.map((option) => {
                        return(
                            <div>
                                <button className="btn btn-secondary" onClick={() => handleClick(option.name, option.surname, option.id)}>
                                    {option.surname} {option.name}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </Modal>
            <Modal isOpen={secondModalIsOpen} onRequestClose={closeSecondModal}>
                <strong>Вы уверены, что хотите сделать пользователя {userData?.surname} {userData?.name} учителем?</strong>
                <button className="btn btn-secondary" onClick={handleSubmit}>ДА</button>
                <button className="btn btn-danger" onClick={closeSecondModal}>Отмена</button>
            </Modal>
            <button onClick={addSubGroup}>Добавить подгруппу</button>
            <Modal isOpen={subgroupModalIsOpen} onRequestClose={closeSubGroupModal}>
                <CustomInput
                    inputType="text"
                    placehodler="Введите название группы"
                    classAttr=""
                    onChange={handleGroupNameInputChange}
                    required={false}
                    ></CustomInput>
                    <CustomInput
                    inputType="text"
                    placehodler="Введите название подгруппы"
                    classAttr=""
                    onChange={handleSubGroupNameInputChange}
                    required={false}
                ></CustomInput>
                <button
                    type="button"
                    className="btn btn-secondary add-subgroup-btn"
                    onClick={handleAddSubgroup}
                >Добавить</button>
                <button className="btn btn-danger" onClick={closeSubGroupModal}>Закрыть</button>
            </Modal>
        </div>
    </>
    );
}

export default Edit;