import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { useRef } from 'react';

import { PrimaryButton } from '@/Components/Button';

export default function UpdatePasswordForm({handleClickHideModal}) {
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
                <h2 className="section_title">
                    Update Password
                </h2>
                <p className="process_content_section_text">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>

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
