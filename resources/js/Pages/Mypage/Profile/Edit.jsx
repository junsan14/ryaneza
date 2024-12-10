
import Layout from '@/Layouts/Layout';
import { Head, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';

import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { useRef, useState } from 'react';
import Modal from '@/Components/Modal';
import { PrimaryButton, DangerButton } from '@/Components/Button';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import {useForm} from '@inertiajs/react';

export default function Edit({status }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(false);
    const userEmail = usePage().props.auth.user.email;
    const is_email_verified = usePage().props.auth.user.email_verified_at;
    const { post, processing } = useForm({});

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
    const sendVerification = (e) => {
        e.preventDefault();
        post(route('verification.send'),{
            preserveScroll: true,
        }
            );
        
    };
    return (
            <Layout>
             <Head title="Profile" />
                <div className="process">
                    <h1 className="main_title">PROFILE</h1>
                    <div className="process_content">
                    <section className="process_content_section section">
                        <UpdateProfileInformationForm mustVerifyEmail={is_email_verified } status={status}/>
                    </section>
                    <section className="process_content_section section">
                        <h2 className='section_title'>Change Email</h2>
                        <div className='form input-area'>
                            <InputLabel htmlFor="email" value="Current Email" />
                            <TextInput
                                id="email"
                                value={userEmail}
                                required
                                autoComplete="email"
                                type='email'
                                readOnly={true}
                            />
                            <InputError message={!is_email_verified ?"Your email has not been verified.":""} />
                        </div>
                            {!is_email_verified  && 
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
                     
                        
                        <Modal isModalOpen={isModalOpen} handleClickHideModal={handleClickHideModal} 
                                modalContent={modalContent}  />
                 
                    </section>
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
                        <Modal isModalOpen={isModalOpen} handleClickHideModal={handleClickHideModal} 
                                modalContent={modalContent}  />
                 
                    </section>
                    <section className="process_content_section section">
                        <DeleteUserForm isModalOpen={isModalOpen} modalContent={modalContent} handleClickShowModal={handleClickShowModal} handleClickHideModal={handleClickHideModal}/>         
                    </section>
                    </div>
                </div>
            </Layout>
  
    );
}
