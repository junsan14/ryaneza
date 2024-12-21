import { Head, Link, useForm, router,usePage,useRemember } from '@inertiajs/react';
import { PrimaryButton } from '@/Components/Button';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { ShowModal } from '@/Layouts/Layout';
import { useContext } from 'react';

export default function RegisterModal() {
  const { errors } = usePage().props;
  const {handleClickHideModal,state} = useContext(ShowModal);
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
        form.post(route('register', formState),{
            onSuccess:handleClickHideModal
        })

        
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
                    <InputLabel htmlFor="repassword" value="Cofirm Password" className='input-area_label' />
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
