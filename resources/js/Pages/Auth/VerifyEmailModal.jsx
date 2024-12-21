import { Head, Link, useForm } from '@inertiajs/react';
import { PrimaryButton } from '@/Components/Button';
import { useContext } from 'react';
import { ShowModal } from '@/Layouts/Layout';

export default function VerifyEmail() {
    const { post, processing } = useForm({});
    const {handleClickHideModal} = useContext(ShowModal);
    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'),{
            onSuccess:handleClickHideModal
        }
            );
        
    };

    return (
        <>
            <h1 className="main_title">CHECK YOUR EMAIL</h1>
            <div className="process_content">
                <section className="process_content_section section">
                    <h2 className="section_title">Thank you for signing up!</h2>
                    <div className="process_content_section">
                        <p className="process_content_section_text">
                             Please confirm your email address by clicking the link we just sent you. 
                            If you didn’t get the email, let us know, and we’ll happily resend it.
                        </p>
                    </div>
                </section>
                <form onSubmit={submit} className='form'>
                    <PrimaryButton disabled={processing}>
                        Resend Verification Email
                    </PrimaryButton>
                </form> 
            </div>
        </>
    );
}
