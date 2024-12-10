import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { useRef } from 'react';

import { PrimaryButton } from '@/Components/Button';

export default function UpadateEmailForm({handleClickHideModal}) {
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
                <h2 className="section_title">
                    Update Email
                </h2>

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
