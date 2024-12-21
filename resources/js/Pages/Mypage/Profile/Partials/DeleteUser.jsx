import { DangerButton } from '@/Components/Button';
import Modal from '@/Components/Modal';
import { ShowModal } from '@/Layouts/Layout';
import { useContext,useRef } from 'react';
import { usePage,useForm } from '@inertiajs/react';
import { PrimaryButton } from '@/Components/Button';


function DeleteUserIndex() {
    const {handleClickShowModal} = useContext(ShowModal);
    return (
        <>
            <section className="process_content_section section">
                <h2 className="section_title">
                    Delete Account
                </h2>

                <p className="process_content_section_text">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
  
                <DangerButton onClick={handleClickShowModal} id="confirm-user-deletion">
                    Delete Account
                </DangerButton>
            </section>
        </>
    );
}

function DeleteUserFormModal(){
    const passwordInput = useRef();
    const {errors} = usePage().props;
    const {handleClickHideModal} = useContext(ShowModal);
    const {
           data,
           setData,
           delete: destroy,
           processing,
           reset,
           clearErrors,
           progress
       } = useForm({
           password: '',
   });
   const deleteUser = (e) => {
           e.preventDefault();
           destroy(route('profile.destroy'), {
               onSuccess: () => handleClickHideModal(),
               onError: () => passwordInput.current.focus(),
               onFinish: () => reset(),
           });
       };
       return(
            <>
               <h1 className='main_title'> 
                   Confirm user deletion
               </h1>
               <p className="">
                           Once your account is deleted, all of its resources and
                           data will be permanently deleted. 
                       </p>
               <form onSubmit={deleteUser} className='form'>
                   <div className='input-area'>
                       <label htmlFor="password" value="password" className='input-area_label' >
                       Password
                       </label>
   
                       <input
                           id="password"
                               type="password"
                               name="password"
                               ref={passwordInput}
                               value={data.password}
                               className='input-area_box' 
                               onChange={(e) =>
                                   setData('password', e.target.value)
                               }
                               required
                       />
                       <span className='input-error'>{errors.password}</span>
                   </div>
                   <div className='btn-flex'>
                       <PrimaryButton onClick={(e)=>{
                        e.preventDefault()
                        handleClickHideModal()
                    }} disabled={processing}> 
                           Cancel
                       </PrimaryButton>
                       <DangerButton disabled={processing}>
                           Delete Account
                       </DangerButton>
                   </div>
                   {progress && (
                     <progress value={progress.percentage} max="100">
                       {progress.percentage}%
                     </progress>
                   )}
               </form>
   
    </>
           )
   }

export {DeleteUserIndex,DeleteUserFormModal}