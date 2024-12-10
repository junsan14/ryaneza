
import { Link } from "@inertiajs/react";
import { CgProfile} from 'react-icons/cg';
import logo from '../../img/logo.png'
import {IoSearch } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { useState, useEffect, useRef } from "react";
import {usePage} from "@inertiajs/react";
import Modal from "@/Components/Modal";
import { MdOutlineManageAccounts } from "react-icons/md";
import UserMenu from "./UserMenu";
import AdminMenu from "./AdminMenu";

export default function Header(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    let status = usePage().props.status;
    const auth = usePage().props.auth;
    const [modalContent, setModalContent] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownItem, setDropdownItem] = useState(null);
    const dropdownRef = useRef();
    const dropdownRef02 = useRef();

    const handleClickShowDropdown =(e)=>{
             setDropdownItem(e.currentTarget.id);
             e.currentTarget.id !== dropdownItem ? setIsDropdownOpen(true):setIsDropdownOpen(prev =>!prev);
    }
    const handleClickHideDropdown = (e)=>{
         ( (dropdownRef.current && !dropdownRef.current.contains(e.target)) && 
           (dropdownRef02.current && !dropdownRef02.current.contains(e.target))
          ) && setIsDropdownOpen(false);                   
    }
    
    const handleClickShowModal = (e)=>{
        setIsModalOpen(true);
        status = e.currentTarget.id;
        setModalContent(status);
        document.body.style.overflow = "hidden";
    }
    const handleClickHideModal = ()=>{
        setIsModalOpen(false);
        document.body.style.overflow = "auto";
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
                            <CgProfile /> 
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
    

            <Modal modalContent={modalContent} setModalContent={setModalContent} 
                isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} handleClickHideModal={handleClickHideModal}/>
        </>
		)
}

function Header_sp({auth}){
    return(

        <header className="header-sp">
            <div className="header-sp_icon-area">
                <Link href="/" className="header-sp_icon-area_link">
                    <IoSearch/>
                </Link>
                <p className="header-sp_icon-area_title">Explore</p>
            </div>
            <div className="header-sp_icon-area">
                <Link href="/" className="header-sp_icon-area_link">
                    <FcLike />
                </Link>
                <p className="header-sp_icon-area_title">Wishlists</p>
            </div>
            <div className="header-sp_icon-area">
                {auth.user?(
                    <>
                        <Link href="/" className="header-sp_icon-area_link">
                         <CgProfile />
                        </Link>
                        <p className="header-sp_icon-area_title">Logout</p>
                    </>

                ):(
                    <>
                        <Link href="/" className="header-sp_icon-area_link">
                         <CgProfile />
                        </Link>
                        <p className="header-sp_icon-area_title">Login</p>
                    </>
                )}
            </div>
                
            </header>
            
        )
}

export {Header_sp};


/*{auth.user.admin ??(
                         <>
                            <li className="header_ul-area_li_user_items_li" >
                                <Link href={route('admin.mypage')}>Admin Mypage</Link>
                            </li>
        
                         </>

                            )

                        } */

 