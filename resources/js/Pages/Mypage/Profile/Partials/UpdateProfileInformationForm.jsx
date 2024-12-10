import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import {PrimaryButton} from '@/Components/Button';
import TextSelect from '@/Components/TextSelect';
import TextInput from '@/Components/TextInput';

import { Link, useForm, usePage } from '@inertiajs/react';
import { CountryList } from '@/Shared/CountryLists';

export default function UpdateProfileInformation({mustVerifyEmail}) {
    const user = usePage().props.auth.user;
    const {errors} = usePage().props;
    const { data, setData, patch, processing, recentlySuccessful } =
        useForm({
            username: user.username,
            email: user.email,
            country:user.country?user.country:"Rwanda",
            birth_year:user.birth_year?user.birth_year:"",
            sex:user.sex?user.sex:"Male",
            type:user.type?user.type:"Living",
        });
      
    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update',data),{
            preserveScroll: true,
    
        })};
    return (
        <>
            <h2 className="section_title">Profile Information</h2>
            <p>Update your account's profile information.</p>

            <form onSubmit={submit} className='form'>
                <div className='input-area'>
                    <InputLabel htmlFor="username" value="Username"/ >
                    <TextInput
                        id="name"
                        value={data.username}
                        onChange={(e) => setData('username', e.target.value)}
                        required
                        autoComplete="username"
                        type='text'
                    />
                    <InputError message={errors.username} />
                </div>
                <div className='input-area'>
                    <InputLabel htmlFor="sex" value="Gender" />
                    <TextSelect
                        id="sex"
                        value={data.sex}
                        onChange={(e) => setData('sex', e.target.value)}
                        autoComplete="sex"
                        required
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </TextSelect>
                    <InputError message={errors.sex} />
                </div>
                <div className='input-area'>
                    <InputLabel htmlFor="birth_year" value="Year of birth"/>
                    <TextInput
                        id="birthday"
                        value={data.birth_year}
                        onChange={function(e){
                            const val = e.target.value;
                            if (e.target.value.length > e.target.maxLength)
                            e.target.value = e.target.value.slice(0,e.target.maxLength);
                            setData('birth_year', e.target.value);
                            
                        }}
                        autoComplete="birth_year"
                        type='number'
                        placeholder='1992'
                        maxLength="4"
                        
                    />
                    <InputError message={errors.birth_year} />
                </div>
                <div className='input-area'>
                    <InputLabel htmlFor="country" value="Country"/>
                    <TextSelect 
                        id="country"
                        value={data.country}
                        onChange={(e) => setData('country', e.target.value)}
                        required
                        autoComplete="country"
                        >
                        {CountryList.map((country,i)=>(
                            <option key={i} value={country.name} defaultValue="Rwanda" >{country.name}</option>
                           ))}

                    </TextSelect>
                   <InputError message={errors.country} />
                </div>
                <div className='input-area'>
                    <InputLabel htmlFor="type" value="You are" />
                    <TextSelect
                        id="type"
                        value={data.type}
                        onChange={(e) => setData('type', e.target.value)}
                        autoComplete="type"
                        required
                    >
                        <option value="living">Living</option>
                        <option value="travelling">Travelling</option>
                    </TextSelect>
                    <InputError message={errors.type} />
                </div>
                <PrimaryButton disabled={processing}>                     
                    Update
                </PrimaryButton>
               
            </form>
        </>
    );
}
