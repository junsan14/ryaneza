import { Link, usePage } from '@inertiajs/react';
import Header from '@/Shared/Header';
import { useState,useEffect,useContext,createContext } from 'react';
import Modal from "@/Components/Modal";
export const ShowModal = createContext();

export default function Layout({ children,auth }) {
    let {state} = usePage().props;
    let {message} = usePage().props;
    const [msgState, setMsgState] = useState(message);

    const [isShowMsg,setisShowMsg] = useState(false);
    const [pageShow, setPageShow] = useState(false);
    const [clickMsg, setClickMsg]= useState(false);

    const [modalContent, setModalContent] = useState("");
    const [modalState, setModalState] = useState(state);
    const [isModalOpen, setIsModalOpen] = useState("");

    const handleClickShowModal = (e,content)=>{
        setIsModalOpen(true);
        setModalState(e.currentTarget.id);
        setModalContent(content);
        document.body.style.overflow = "hidden";
    }
    const handleClickHideModal = ()=>{
        setIsModalOpen(false);
        document.body.style.overflow = "auto";
    }
    //console.log(message)
    useEffect(()=>{
        setMsgState(message);

        setTimeout(function(){
            setPageShow(true);
        },100)
        if(message){
            setisShowMsg(true);
        }
    },[message])
    return (
        <ShowModal.Provider value={{
            modalContent,setModalContent,
            modalState,setModalState,
            isModalOpen,setIsModalOpen,
            handleClickHideModal,handleClickShowModal,
            setisShowMsg, 
            state,
            setMsgState
            }}>
            <Modal />
            <div className={`flash-area ${isShowMsg?"show":""}` }>
                <div className='flash-area_msg'>{msgState && msgState}</div>
                <div className='flash-area_toggle' onClick={()=>{
                    document.getElementsByClassName('flash-area')[0].classList.add('hide')
                    }}>
                </div>
            </div>
            <Header auth={auth} /> 
            <main className={pageShow?"main wrap fade":"main wrap"}>    
                    {children}
            </main>
        </ShowModal.Provider>
        
    );
}
