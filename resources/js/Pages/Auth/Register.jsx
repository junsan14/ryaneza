import { Head, Link, useForm, router,usePage,useRemember } from '@inertiajs/react';
import { PrimaryButton } from '@/Components/Button';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function Register() {
  const { errors } = usePage().props
    const [formState, setFormState] = useRemember({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    },'Auth/Register')
    const form = useForm('Auth/Register',formState);
    
    const handleChangeData = (e)=>{
        const key = e.target.id;
        const value =e.target.value;
        form.setData(data => ({
            ...data,
            [key]:value,
        }))
    }
    const submit = (e) => {
        e.preventDefault();
        form.post('register', formState)

        
    };
    return (
        <>
            <h1 className='main_title'> 
                Sign up
            </h1>
            <section className='section'>
                <h2 className='section_title'>Welcome to Kurrjya App</h2>
            </section>
            <form onSubmit={submit} className='form'>
                <div className='input-area'>
                    <InputLabel htmlFor="username" value="Username" />
                    <TextInput
                        id="username"
                        type="text"
                        name="username"
                        value={form.data.username}
                        onChange={handleChangeData}
                        placeholder=''
                        required
                        maxLength={255}
                    />
                    <InputError message={errors.username} />
                </div>
                <div className='input-area'>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={form.data.email}
                        onChange={handleChangeData}
                        placeholder=''
                        required
                    />
                    <InputError message={errors.email} />
                </div>
                <div className='input-area'>
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={form.data.password}
                        onChange={handleChangeData}
                    />
                    <InputError message={errors.password} />
                </div>
                <div className='input-area'>
                    <InputLabel htmlFor="repassword" value="repassword" className='input-area_label' />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={form.data.password_confirmation}
                        autoComplete="password_confirmation"
                        onChange={handleChangeData}
                        placeholder=''
                    />
                    <InputError message={errors.password_confirmation} />
                </div>
                <PrimaryButton disabled={form.processing}>
                    Register
                </PrimaryButton>
            </form>
        </>
    );
}


/*
<GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
 */