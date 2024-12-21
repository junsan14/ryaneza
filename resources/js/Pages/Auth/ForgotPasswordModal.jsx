import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';

import { Head, useForm, usePage } from '@inertiajs/react';
import { PrimaryButton } from '@/Components/Button';
import { useContext } from 'react';
import { ShowModal } from '@/Layouts/Layout';

export default function ForgotPassword() {
    const {errors} = usePage().props;
    const {handleClickHideModal} = useContext(ShowModal);
    const { data, setData, post, processing } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'),{
            onSuccess:handleClickHideModal
        });
    };

    return (
        <>
            <h1 className='main_title'> Forgot your password? </h1>
            <div className="process_content">
            <section className='process_content_section section'>
                <h2 className='section_title'>No problem</h2>
                <p className='process_content_section_text'>
                    Simply provide us with your email address, and we’ll send you a password reset link so you can create a new one.
                </p>
                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}
            </section>
            <form onSubmit={submit} className='form'>
                <div className='input-area'>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email}/>
                </div>
                <PrimaryButton disabled={processing}>
                    Email Password Reset Link
                </PrimaryButton>
                
            </form>
            </div>
        </>
    );
}
