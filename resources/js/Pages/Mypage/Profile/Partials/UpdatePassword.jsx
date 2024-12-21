import { PrimaryButton } from "@/Components/Button"
import { ShowModal } from "@/Layouts/Layout"
import { useContext,useRef } from "react"
import { usePage,useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

function UpdatePasswordIndex(){
    const {handleClickShowModal} = useContext(ShowModal);
    return(
        <>
        <section className="process_content_section section">
            <h2 className='section_title'>Change password</h2>
            <p className="process_content_section_text">
                Ensure your account is using a long, random password to stay
                secure.
            </p>
            <div className="btn-area">
                <PrimaryButton id="update-password" onClick={handleClickShowModal}>
                    Change Passowrd
                </PrimaryButton>
            </div>
        </section>
        </>
    )
}

function UpdatePasswordFormModal() {
    const {handleClickHideModal} = useContext(ShowModal)
    const passwordInput = useRef();
    const currentPasswordInput = useRef();
    const {errors} = usePage().props;
    const {
        data,
        setData,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                handleClickHideModal()
            },
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <>
            <h1 className="main_title">
                Update Password
            </h1>


            <form onSubmit={updatePassword} className='form'>
                <div className='input-area'>
                    <InputLabel htmlFor="current_password" value="Current password" />
                    <TextInput
                        id="current_password"
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        required
                        autoComplete="current_password"
                        type='password'
                    />
                    <InputError message={errors.current_password} />
                </div>

                <div className='input-area'>
                    <InputLabel htmlFor="password" value="New password" />
                    <TextInput
                        id="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        autoComplete="password"
                        type='password'
                    />
                     <InputError message={errors.password} />
                </div>
                <div className='input-area'>
                    <InputLabel htmlFor="password_confirmation" value="Confirm password" />
                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                        autoComplete="password_confirmation"
                        type='password'
                    />
                     <InputError message={errors.password_confirmation} />
                </div>
                <PrimaryButton disabled={processing}>
                    Update
                </PrimaryButton>
            </form>
        </>
    );
} 

export {UpdatePasswordIndex,UpdatePasswordFormModal}