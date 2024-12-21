import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Head, usePage,useForm } from '@inertiajs/react';
import { PrimaryButton } from '@/Components/Button';
import { ShowModal } from '@/Layouts/Layout';
import { useContext,useRef } from 'react';



function UpdateEmailIndex(){
    const { post, processing } = useForm({});
    const user = usePage().props.auth.user;
    const {handleClickShowModal,handleClickHideModal} =useContext(ShowModal);
    
    const sendVerification = (e) => {
        e.preventDefault();
        post(route('verification.send'),{
            preserveScroll: true,
        }
            );
        
    };
    return(
    <>
        <section className="process_content_section section">
        <h2 className='section_title'>Change Email</h2>
        <div className='form input-area'>
            <InputLabel htmlFor="email" value="Current Email" />
            <TextInput
                id="email"
                value={user.email}
                required
                autoComplete="email"
                type='email'
                readOnly={true}
            />
            <InputError message={!user.email_verified_at ?"Your email has not been verified yet.":""} />
        </div>
            {!user.email_verified_at  && 
                    <div className="link-area">
                        <button id="update-email" disabled={processing} onClick={sendVerification}>
                            Want to get a verification mail again?
                        </button>
                    </div>

            }
        <div className="btn-area">
            <PrimaryButton id="update-email" onClick={handleClickShowModal}>
                Change Email
            </PrimaryButton>
        </div>
 
        </section>
    </>
    )
}

function UpdateEmailFormModal() {
    const emailInput = useRef();
    const currentPasswordInput = useRef();
    const {errors} = usePage().props;
    const {
        data,
        setData,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        email:"",
        password:"",
    });
    const {handleClickHideModal} = useContext(ShowModal);
    const updateEmail = (e) => {
        e.preventDefault();

        post(route('email.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                handleClickHideModal()
            },
            onError: (errors) => {
                if (errors.email) {
                    reset('email');
                    emailInput.current.focus();
                }
            },
        });
    };

    return (
        <>
            <h1 className="main_title">
                Update Email
            </h1>
            <form onSubmit={updateEmail} className='form'>
                <div className='input-area'>
                    <InputLabel htmlFor="email" value="New Email address" />
                    <TextInput
                        id="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="email"
                        type='email'
                    />
                    <InputError message={errors.email} />
                </div>
                <div className='input-area'>
                    <InputLabel htmlFor="password" value="Password" />
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

                <PrimaryButton disabled={processing}>
                    Update
                </PrimaryButton>
            </form>
        </>
    );
}

export {UpdateEmailIndex, UpdateEmailFormModal}