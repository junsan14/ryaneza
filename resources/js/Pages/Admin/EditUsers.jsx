import Layout, { ShowModal } from "@/Layouts/Layout";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { usePage,Head, Link, router, useForm } from "@inertiajs/react";
import { useContext, useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { PrimaryButton } from "@/Components/Button";
import InputError from "@/Components/InputError";
import TextSelect from "@/Components/TextSelect";
import { CountryList } from "@/Shared/CountryLists";
import Checkbox from "@/Components/Checkbox";
import { formatDate } from "@/script";
export default function EditUsers(){
    const {users} = usePage().props;
    return(
        <Layout>
            <Head title="Edit- Users" />

	        <div className='others edit-users'>
	            <h1 className='main_title'> 
	                Edit Users
	            </h1>
                <section className="edit-users">
                    <table>
                        <thead><tr><td>ID</td><td>USERNAME</td><td>EMAIL</td><td>EMAIL-VERIFIED</td><td>Permission</td><td></td> <td></td></tr></thead>
                        <Users users={users} />
                    </table>
                </section>
            </div>
        </Layout>
    )
}

const Users = ({users})=>{
    const {handleClickShowModal} = useContext(ShowModal);
    const {
        delete: destroy,
        reset,
    } = useForm({});
    const handleClickDelete = (e,deleteuser)=>{
        e.preventDefault();
        //$(e.currentTarget).parent().prop('disabled', true);
        //$(e.currentTarget).css('cursor', "not-allowed");
        //setEditInfo([id, "", "delete"]);
        destroy(route('user.destroy',deleteuser),{
        	onBefore: () => {
                    const res = confirm('Do you really want to delete?');
                    if(!res){
                    }
                    return res;
             },
            onFinish: () => reset(),
            preserveScroll:true
        });
     }
    return(
        <>
            {users.map((user,i)=>(
                <tr>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{formatDate(user.email_verified_at)}</td>
                    <td>{user.admin ? "Admin":"Guest"}</td>
                    <td>
                        <button id="edit-user" onClick={(e,content={user} )=>handleClickShowModal(e,content)}>
                            <CiEdit />
                        </button>
                    </td>
                    <td>
                        <button onClick={(e,deleteuser=user)=>handleClickDelete(e,deleteuser)}>
                            <MdOutlineDelete />
                        </button>
                    </td>
                </tr>
            ))}
        
        </>


    )
}

const EditUserModal = ()=>{
    const {handleClickHideModal} = useContext(ShowModal);
    const {modalContent} = useContext(ShowModal);
    console.log(modalContent);
    const {errors} = usePage().props;
    const { data, setData, post, processing } = useForm({
        id:modalContent.user.id,
        username: modalContent.user.username,
        country: modalContent.user.country,
        birth_year: modalContent.user.birth_year,
        gender: modalContent.user.gender,
        locality_type:modalContent.user.locality_type,
        email_verified_at: modalContent.user.email_verified_at,
        admin: modalContent.user.admin,
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('user.update'),{
            onSuccess:handleClickHideModal
        });
    };
    return(
        <>
            <section className='section'>
                <h2 className='section_title'> Update </h2>
            </section>
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
                    <InputLabel htmlFor="type" value="He/She is" />
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
                <div className="input-area flex">
                        <Checkbox type='checkbox'
                            id="email_verified_at"
                            name="email_verified_at"
                            checked={data.email_verified_at}
                            onChange={(e) =>{setData('email_verified_at', e.target.checked);} }
                        />
                    <InputLabel htmlFor='email_verified_at' value="Email Verified " />
                    {data.email_verified_at && 
                        <p>  at { formatDate(data.email_verified_at) == "1970/01/01"?formatDate(new Date()):formatDate(data.email_verified_at)}</p>
                    
                    }
                </div>
                <div className="input-area flex">
                        <Checkbox type='checkbox'
                            id="admin"
                            name="admin"
                            checked={data.admin}
                            onChange={(e) =>{setData('admin', e.target.checked);} }
                        />
                    <InputLabel htmlFor='admin' value="Admin Permission" />
                </div>
                <PrimaryButton disabled={processing}>                     
                    Update
                </PrimaryButton>
               
            </form>
            
        </>

    )
}




  export {EditUserModal}