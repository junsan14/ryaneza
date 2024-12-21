import RegisterModal from "@/Pages/Auth/RegisterModal";
import LoginModal from "@/Pages/Auth/LoginModal";
import VerifyEmailModal from "@/Pages/Auth/VerifyEmailModal";
import ForgotPasswordModal from "@/Pages/Auth/ForgotPasswordModal";
import { DeleteUserFormModal } from "@/Pages/Mypage/Profile/Partials/DeleteUser";
import { UpdatePasswordFormModal } from "@/Pages/Mypage/Profile/Partials/UpdatePassword";
import { UpdateEmailFormModal } from "@/Pages/Mypage/Profile/Partials/UpdateEmail";
import { BistroMenuModal } from "@/Pages/Bistro/Bistro";
import { EditUserModal } from "@/Pages/Admin/EditUsers";
import CreateReviewModal from "@/Pages/Bistro/Partials/CreateReviewModal";
import { ReviewDetailModal } from "@/Pages/Bistro/Partials/Reviews";
import EditReviewModal from "@/Pages/Bistro/Partials/EditReviewModal";
import { BistroMoreinforModal } from "@/Pages/Bistro/Bistro";


import { useContext } from "react";
import { ShowModal } from "@/Layouts/Layout";
export default function Modal(){

    const {modalContent, setModalContent} = useContext(ShowModal);
    const {modalState, setModalState} = useContext(ShowModal);
    const {isModalOpen, setIsModalOpen} = useContext(ShowModal);
    const {handleClickShowModal} = useContext(ShowModal);
    const {handleClickHideModal} = useContext(ShowModal);
   

const Content = ()=>{
    switch(modalState){
        case "signup":
            return <RegisterModal />
            break;
        case "login":
            return <LoginModal />
            break;
        case "verifyemail":
            return <VerifyEmailModal />
            break;
        case "forgot-password":
            return <ForgotPasswordModal />
            break;
        case "confirm-user-deletion":
            return <DeleteUserFormModal />
            break;
        case "update-password":
            return <UpdatePasswordFormModal  />
            break;
        case "update-email":
            return <UpdateEmailFormModal />
            break;
        case "review-detail":
            return <ReviewDetailModal  />
            break;
        case "bistro-menu":
            return <BistroMenuModal />
            break;
        case "edit-user":
            return <EditUserModal  />
            break;  
        case "create-review":
                return <CreateReviewModal />
            break; 
        case "edit-review":
                return <EditReviewModal />
            break; 
        case "bistro-more-info":
            return <BistroMoreinforModal />
            break;    
       
    }
}


    return (
    <>
        <div className="modal">
            <div className={`modal_mask ${isModalOpen&&"show"}`} onClick={handleClickHideModal}></div>
            <div className={`modal_area_toggle ${isModalOpen&&"show"} ${modalState === "bistro-menu" &&"white"}`} onClick={handleClickHideModal}>
            </div>
            <div className={`wrap modal_area  ${isModalOpen&&"show"} ${modalState === "bistro-menu" &&"large"}`}>
                <section className={`modal_area_content ${isModalOpen&&"show"} ${modalState === "bistro-menu" && "image"}`}>
                    <Content />
                </section>
            </div> 
        </div>
        </>
    );
}

