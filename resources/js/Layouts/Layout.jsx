import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import Header from '@/Shared/Header';
import { useState,useEffect } from 'react';

export default function Layout({ children,auth }) {
    const {message} = usePage().props;
    const [isShowMsg,setisShowMsg] = useState(false);
    const [pageShow, setPageShow] = useState(false);
    //console.log(message)
    useEffect(()=>{
        setTimeout(function(){
            setPageShow(true);
        },100)
        if(message){
            setisShowMsg(true);
        }
    },[message])
    return (
        <>
            <div className={`flash-area ${isShowMsg?"show":""}` }>
                <div className='flash-area_msg'>{message && message}</div>
                <div className='flash-area_toggle' onClick={()=>{
                    document.getElementsByClassName('flash-area')[0].classList.add('hide')
                    }}>
                </div>
            </div>
            <Header auth={auth}/> 
            <main className={pageShow?"main wrap fade":"main wrap"}>    
                {children}
            </main>
            </>
    );
}
