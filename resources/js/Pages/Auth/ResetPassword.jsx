import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { PrimaryButton } from '@/Components/Button';
import TextInput from '@/Components/TextInput';
import Layout from '@/Layouts/Layout';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <Layout>
            <Head title="Reset Password" />
            <div className='process edit-users'>
                <h1 className='main_title'> 
                    Reset your password
                </h1>
                <section className='section'>
                    <h2 className='section_title'>Welcome to Kurrjya App</h2>
                </section>
                <form onSubmit={submit} className='form'>
                    <div className='input-area'>
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} />
                    </div>

                    <div className="input-area">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            autoComplete="new-password"
                            isFocused={true}
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} />
                    </div>

                    <div className="input-area">
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                        />

                        <TextInput
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                        />

                        <InputError message={errors.password_confirmation}/>
                    </div>
                    <PrimaryButton  disabled={processing}>
                        Reset Password
                    </PrimaryButton>
                </form>
            </div>
        </Layout>
    );
}
