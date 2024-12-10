import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import {PrimaryButton} from '@/Components/Button';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm,router, usePage, useRemember} from '@inertiajs/react';

export default function Login({ status, canResetPassword,setModalContent,handleClickHideModal }) {
    const {errors} = usePage().props;
    const [formState, setFormState] = useRemember({
        email:"",
        password:"",
        remember:false
    },'Auth/Login')
  
    const form = useForm('Auth/Login',formState);
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
        form.post(route('login',formState),{
            onSuccess:handleClickHideModal
        })
        
    }
    //console.log(form.processing)
    return (
        <>
            <h1 className='main_title'> 
                Log in
            </h1>
            <section className='section'>
                <h2 className='section_title'>Welcome to Kurrjya App</h2>
            </section>
            <form onSubmit={submit} className='form' id="form">
                <div className='input-area'>

                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput 
                        id="email"
                        type="email"
                        name="email"
                        value={form.data.email}
                        onChange={handleChangeData}
                        autoComplete="email"
                        placeholder=''
                        required
                    />
                    <InputError message={errors.email} />
                </div>
                <div className='input-area'>
                    <InputLabel htmlFor="password" value="Password"/>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={form.data.password}
                        onChange={handleChangeData}
                    />
                    <InputError>{errors.password}</InputError>
                </div>
                <div className="input-area flex">
                        <Checkbox type='checkbox'
                            id="remember"
                            name="remember"
                            checked={form.data.remember}
                            onChange={(e) =>{form.setData('remember', e.target.checked);} }
                        />
                    <InputLabel htmlFor='remember' value="Remember me" />
                </div>
                <PrimaryButton disabled={form.processing} form="form">
                    Login
                </PrimaryButton>
            </form>
            <div className="link-area">
                <button onClick={()=>setModalContent('forgotpassword')}>
                    Forgot password?
                </button>
            </div>
        </>
    );
}
