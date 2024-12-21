
import Layout from '@/Layouts/Layout';
import { Head, usePage } from '@inertiajs/react';
import { DeleteUserIndex } from './Partials/DeleteUser';

import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { UpdateEmailIndex } from './Partials/UpdateEmail';
import { UpdatePasswordIndex } from './Partials/UpdatePassword';

import { PrimaryButton } from '@/Components/Button';
import { router } from '@inertiajs/react';

export default function Edit( ) {
    const hanldeClickLogout = ()=>{
        router.post('/logout')
    }
    return (
            <Layout>
             <Head title="Profile" />
                <div className="process">
                    <h1 className="main_title">PROFILE</h1>
                    <div className="process_content">
                        <UpdateProfileInformationForm />
                        <UpdateEmailIndex />
                        <UpdatePasswordIndex />
                        <DeleteUserIndex />
                        <section className='section'>
                            <h2 className='section_title'>Logout</h2>
                            <PrimaryButton onClick={(e)=>{hanldeClickLogout()}} id="logout"> 
                                Logout 
                            </PrimaryButton>
                        </section>
                    </div>
                </div>
            </Layout>
  
    );
}
