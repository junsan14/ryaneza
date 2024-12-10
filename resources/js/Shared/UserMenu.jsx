
import { Link } from "@inertiajs/react";
import { router } from '@inertiajs/react'
export default function UserMenu ({auth,handleClickShowModal,handleClickHideModal}){
    const email_verified_at = auth.user?auth.user.email_verified_at:"";
    const hanldeClickLogout = ()=>{
            router.post('/logout')
    }
	if(auth.user){
		return(
				<>  
		            <li className="drop-down_items_item">
		              <Link href={route('profile.edit')}>Profile{!email_verified_at?" (not verified)":""}</Link>
		            </li>
		            <li className="drop-down_items_item">
		               {email_verified_at?<Link href={route('mypage')}>Mypage</Link>:
		               <button id="verifyemail" onClick={handleClickShowModal}>Mypage</button> }
		            </li>
		            <li className="drop-down_items_item">
		               <button onClick={(e)=>{
		                    handleClickHideModal
		                    hanldeClickLogout();
		               }} id="logout"> Logout </button> 
		            </li>
		        </>
			)
	}else{
		return(
				<>  
	                <li className="drop-down_items_item" id="signup"
	                    onClick={handleClickShowModal}>
	                    <button>Sign Up</button>
	                </li>
	                <li className="drop-down_items_item" id="login" 
	                    onClick={handleClickShowModal}>
	                   <button>Log in</button>
	                </li>           
            	</>

			)
	}

}

