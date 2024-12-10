import { useRef, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { PrimaryButton,DangerButton } from '@/Components/Button';

export default function ConfirmUserDeletion({handleClickHideModal}){
 const passwordInput = useRef();
 const {errors} = usePage().props;
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
            <section className='section'>
                <h2 className='section_title'>Are you sure you want to delete your account?</h2>
            </section>
            <p className="">
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account.
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
                            required
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                    />
                    <span className='input-error'>{errors.password}</span>
                </div>
                <div className='btn-flex'>
                    <PrimaryButton onClick={handleClickHideModal} disabled={processing}> 
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