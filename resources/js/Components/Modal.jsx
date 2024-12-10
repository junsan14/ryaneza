import Register from "@/Pages/Auth/Register";
import Login from "@/Pages/Auth/Login";
import VerifyEmail from "@/Pages/Auth/VerifyEmail";
import ForgotPassword from "@/Pages/Auth/ForgotPassword";
import ConfirmUserDeletion from "@/Pages/Mypage/Profile/Partials/ConfirmingUserDeletion";
import UpdatePasswordForm from "@/Pages/Mypage/Profile/Partials/UpdatePasswordForm";
import UpadateEmailForm from "@/Pages/Mypage/Profile/Partials/UpdateEmailForm";
import { ReviewDetail } from "@/Pages/Bistro/Bistro";
export default function Modal({modalContent,setModalContent,isModalOpen, setIsModalOpen,handleClickHideModal}){
//console.log(modalContent)

const Content = ()=>{
    switch(modalContent){
        case "signup":
            return <Register />
            break;
        case "login":
            return <Login setModalContent={setModalContent}  handleClickHideModal={handleClickHideModal}/>
            break;
        case "verifyemail":
            return <VerifyEmail handleClickHideModal={handleClickHideModal} />
            break;
        case "forgotpassword":
            return <ForgotPassword handleClickHideModal={handleClickHideModal} />
            break;
        case "confirm-user-deletion":
            return <ConfirmUserDeletion handleClickHideModal={handleClickHideModal} />
            break;
        case "update-password":
            return <UpdatePasswordForm handleClickHideModal={handleClickHideModal} />
            break;
        case "update-email":
            return <UpadateEmailForm handleClickHideModal={handleClickHideModal} />
            break;
        case "review-detail":
            return <ReviewDetail handleClickHideModal={handleClickHideModal} />
            break;
       
    }
}


    return (
        <div className="modal"> 
            <div className={`modal_mask ${isModalOpen&&"show"}`} onClick={handleClickHideModal}></div>
            <div className={`wrap modal_area ${isModalOpen&&"show"} ${modalContent === "review-detail"&&"large"}`}>
                <div className="modal_area_toggle" onClick={handleClickHideModal}></div>
                <section className='modal_area_content'>
                    <Content />
                </section>
            </div> 
        </div>
    );
}

/*
<div className='modal js-modal'></div>
                <div className='login wrap'>
                    <h1 className='main_title'> 
                        Sign up
                    </h1>
                    <section className='section'>
                        <h2 className='section_title'>Welcome to Kurrjya App</h2>
                    </section>
                    <form onSubmit={submit} className='form'>
                        <div className='input-area'>
                            <label htmlFor="username" value="username" className='input-area_label' >
                            Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                value={data.username}
                                className='input-area_box'
                                onChange={handleChangeData}
                                placeholder=''
                                required
                            />
                        </div>
                        <div className='input-area'>
                            <label htmlFor="email" value="email" className='input-area_label' >
                            Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className='input-area_box'
                                onChange={handleChangeData}
                                placeholder=''
                                required
                            />
                        </div>
                        <div className='input-area'>
                            <label htmlFor="password" value="password" className='input-area_label' >
                            Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className='input-area_box'
                                onChange={handleChangeData}
                            />
                            <p>{errors.password}</p>
                        </div>
                        <div className='input-area'>
                            <label htmlFor="repassword" value="repassword" className='input-area_label' >
                            Re-type password
                            </label>

                            <input
                                id="password_confirmation"
                                type="Password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className='input-area_box'
                                autoComplete="password_confirmation"
                                onChange={handleChangeData}
                                placeholder=''
                            />
                        </div>
                        <div className='btn-area'>
                            <button className="btn-area_btn" id="status" disabled={processing}>
                                Register
                            </button>
                        </div>
                    </form>
                </div>*/