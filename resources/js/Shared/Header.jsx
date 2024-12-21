
import { Link } from "@inertiajs/react";
import { CgProfile} from 'react-icons/cg';
import logo from '../../img/logo.png'
import {IoSearch } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { useState, useEffect, useRef,useContext, createContext } from "react";
import {usePage} from "@inertiajs/react";
import Modal from "@/Components/Modal";
import { MdOutlineManageAccounts } from "react-icons/md";
import UserMenu from "./UserMenu";
import AdminMenu from "./AdminMenu";
import { ShowModal } from "@/Layouts/Layout";
import { GorillaIcon } from "@/Script";
import { useMediaQuery } from 'react-responsive'


export default function Header(){
    const isDesktop = useMediaQuery({query: '(min-width: 768px)'})
    //const isTablet = useMediaQuery({query: '(min-width: 768)'})
    //const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' })
    //const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    //const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
    const auth = usePage().props.auth;
    return(
        <>
            {isDesktop && <Header_pc auth={auth}/>}
            {isTabletOrMobile && <Header_sp auth={auth}/>}
            
        </>
        
    )
	
}

function Header_pc({auth}){
    const {state,handleClickShowModal,modalContent,setModalContent,isModalOpen,
        setIsModalOpen,modalState,setModalState,handleClickHideModal
    } = useContext(ShowModal);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownItem, setDropdownItem] = useState(null);
    const dropdownRef = useRef();
    const dropdownRef02 = useRef();
    useEffect(()=>{
        if(state){
            setModalState(state)
            setIsModalOpen(true)
        }

    },[state])


    const handleClickShowDropdown =(e)=>{
             setDropdownItem(e.currentTarget.id);
             e.currentTarget.id !== dropdownItem ? setIsDropdownOpen(true):setIsDropdownOpen(prev =>!prev);
    }
    const handleClickHideDropdown = (e)=>{
         ( (dropdownRef.current && !dropdownRef.current.contains(e.target)) && 
           (dropdownRef02.current && !dropdownRef02.current.contains(e.target))
          ) && setIsDropdownOpen(false);                   
    }
    
    //after login, automatically shows verifyemail on the modal
    useEffect(()=>{
        if(auth.user && !auth.user.email_verified_at){
            setModalContent('verifyemail');
        }
        //dropdown
        document.addEventListener("mousedown", handleClickHideDropdown);
        return () => {
          document.removeEventListener("mousedown", handleClickHideDropdown);
        };
        
    },[auth.user])
    return(
        <>
    		<header className="header wrap">
        		<ul className="header_general">
                    <Link href="/">
        			 <img src={logo} alt="" className="header_general_logo" />
                    </Link>
                    <li className="header_general_item"  >
                        <Link href="about" >ABOUT US</Link>
                    </li>
        		</ul>
        		<ul className="header_mgmt">
                    <li className="header_mgmt_item">
                        <div  className="drop-down" id="user" onClick={handleClickShowDropdown} ref={dropdownRef}>
                            {auth.user  
                                ?(auth.user.icon && String(auth.user.icon).indexOf("#") !== 0)
                                ?<img src={auth.user.icon} />
                                :<GorillaIcon color_code={auth.user.icon} />

                            :<CgProfile />  }
                            {(dropdownItem === "user" && isDropdownOpen) &&(
                                <ul className="drop-down_items"  > 
                                    <UserMenu auth={auth} handleClickHideModal={handleClickHideModal}
                                                handleClickShowModal={handleClickShowModal} isDropdownOpen={isDropdownOpen} />
                                </ul>
                        )}  
                        </div>
                            
                                 
                    </li>
                    {(auth.user && auth.user.admin) ?
                    <li className="header_mgmt_item">
                        <div  className="drop-down" id="admin" onClick={handleClickShowDropdown} ref={dropdownRef02}>
                            <MdOutlineManageAccounts />
                            {(dropdownItem === "admin" && isDropdownOpen) &&(
                            <ul className="drop-down_items"  >
                                <AdminMenu isDropdownOpen={isDropdownOpen} />
                            </ul>
                            )}
                        </div>
                            
                    </li>:
                    <></>
                    }
        		</ul>  
            </header>
        </>
		)
}

function Header_sp({auth}){
    const {state,handleClickShowModal,modalContent,setModalContent,isModalOpen,
        setIsModalOpen,modalState,setModalState,handleClickHideModal
    } = useContext(ShowModal);

    useEffect(()=>{
        if(state){
            setModalState(state)
            setIsModalOpen(true)
        }

    },[state])
    return(

        <header className="header-sp">
            <div className="header-sp_icon-area">
                <Link href="/" className="header-sp_icon-area_link">
                    <IoSearch/>
                </Link>
                <p className="header-sp_icon-area_title">Explore</p>
            </div>
            <div className="header-sp_icon-area">
                <Link href="/mypage" className="header-sp_icon-area_link">
                    <FcLike />
                </Link>
                <p className="header-sp_icon-area_title">Wishlists</p>
            </div>
            <div className="header-sp_icon-area">
                {auth.user?(
                    <>
                        <Link href="/profile"  className="header-sp_icon-area_link">
                        {auth.user  
                                ?(auth.user.icon && String(auth.user.icon).indexOf("#") !== 0)
                                ?<img src={auth.user.icon} />
                                :<GorillaIcon color_code={auth.user.icon} />
                            :<CgProfile />  }
                        </Link>
                        <p className="header-sp_icon-area_title">Profile</p>
                    </>

                ):(
                    <>
                        <button id="login" onClick={handleClickShowModal} className="header-sp_icon-area_link">
                         <CgProfile />
                        </button>
                        <p className="header-sp_icon-area_title">Login</p>
                    </>
                )}
            </div>
                
            </header>
            
        )
}

export {Header_sp};


 