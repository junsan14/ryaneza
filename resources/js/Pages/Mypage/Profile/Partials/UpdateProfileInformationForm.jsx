import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import {PrimaryButton} from '@/Components/Button';
import TextSelect from '@/Components/TextSelect';
import TextInput from '@/Components/TextInput';
import TextInputFile from '@/Components/TextInputFile';
import Textarea from '@/Components/Textarea';
import { Link, useForm, usePage } from '@inertiajs/react';
import { CountryList } from '@/Shared/CountryLists';
import { FaImage } from "react-icons/fa";
import { useState } from 'react';
import { LocalityTypes } from '@/Pages/Admin/Shared/BistroForm/Categories';
import { GorillaIcon } from '@/script';

const GoliraIcon = ()=>{
    return (
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
fill="rgba(0,0,0,1)" stroke="none">
<path d="M2465 4749 c-349 -30 -599 -253 -720 -644 -45 -144 -83 -223 -161
-330 -182 -251 -218 -304 -261 -383 -58 -106 -105 -228 -137 -359 -34 -135
-44 -200 -61 -424 -21 -277 -50 -363 -139 -419 -20 -11 -90 -43 -156 -70 -142
-57 -217 -98 -326 -176 -231 -165 -368 -328 -423 -503 -46 -147 -58 -283 -75
-903 l-5 -178 2559 0 2559 0 -5 178 c-20 718 -35 846 -119 1011 -56 111 -177
243 -327 356 -134 102 -216 148 -378 215 -77 32 -156 69 -174 84 -78 59 -101
136 -121 406 -38 500 -114 700 -423 1115 -104 139 -150 229 -197 380 -69 222
-157 363 -299 479 -107 87 -266 151 -400 162 -39 3 -82 6 -96 8 -14 1 -66 -1
-115 -5z m-220 -1562 c66 -18 161 -51 210 -71 50 -21 97 -38 105 -38 8 0 56
17 105 38 232 97 472 137 599 100 94 -28 196 -138 267 -289 79 -171 28 -324
-134 -400 -69 -33 -206 -67 -270 -67 -48 0 -48 -1 -43 -27 36 -184 90 -509 90
-546 1 -63 -19 -80 -122 -104 -68 -16 -127 -18 -492 -18 -365 0 -424 2 -492
18 -103 24 -123 41 -122 104 0 37 54 362 90 546 5 26 5 27 -43 27 -64 0 -201
34 -270 67 -162 76 -213 229 -134 400 67 142 166 253 253 285 84 30 247 20
403 -25z m170 -1533 c127 -4 307 -2 454 5 213 11 245 11 258 -2 41 -41 -37
-142 -151 -197 -117 -55 -220 -74 -411 -75 -178 0 -269 13 -380 57 -141 55
-240 167 -192 217 9 10 36 12 112 7 55 -3 195 -9 310 -12z"/>
<path d="M2054 2880 c-36 -14 -64 -59 -64 -102 0 -105 145 -137 196 -42 45 83
-44 180 -132 144z"/>
<path d="M2970 2868 c-47 -32 -61 -85 -36 -132 34 -63 117 -76 167 -27 87 87
-29 228 -131 159z"/>
<path d="M2314 2090 c-85 -35 -60 -164 31 -164 72 0 111 84 63 138 -26 29 -63
39 -94 26z"/>
<path d="M2744 2090 c-85 -35 -60 -164 31 -164 72 0 111 84 63 138 -26 29 -63
39 -94 26z"/>
</g>
</svg>
    )
}


export default function UpdateProfileInformation() {
    const user = usePage().props.auth.user;
    const {errors} = usePage().props;
    const randam = `0.${user.id}${user.id}${user.id}${user.id}${user.id}${user.id}`;
    const color_code = "#"+ Math.floor(randam*16777215).toString(16);
    //console.log(user)
 
    const { data, setData, patch, post, processing, recentlySuccessful } =
        useForm({
            icon: user.icon && !String(user.icon).includes("#") ? user.icon:"",
            color_code:color_code,
            username: user.username,
            intro: user.intro,
            email: user.email,
            country:user.country?user.country:"Rwanda",
            birth_year:user.birth_year?user.birth_year:"",
            gender:user.gender?user.gender:"male",
            locality_type:user.locality_type?user.locality_type:"0",
        });
       //console.log(data.icon)
    const [previewIcon, setPreviewIcon] = useState(data.icon);

    const handleImageChange = (e) => {	
            //Set image to Preview 
            const reader = new FileReader()
            reader.onload = function(event) {
                // The file's text will be printed here
                setPreviewIcon(event.target.result);
                
             };
              reader.readAsDataURL(e.target.files[0])
              //save data
              setData("icon", e.target.files[0])
        };
    const submit = (e) => {
        e.preventDefault();
        post(route('profile.update',data),{
    
        })};
        const color = "#004864";
    return (
        <section className="process_content_section section">
            <h2 className="section_title">Profile Information</h2>
            <form onSubmit={submit} className='form'>
                <div className='input-area_image profile-icon'>
                    <div className='input-area_image-input'>
                        {previewIcon && 
                        <button className='input-area_image-input_close' 
                                onClick={(e)=>{
                                    setData("icon", "")
                                    setPreviewIcon("");
                                    }
                                }>
                                
                        </button>}
                        <InputLabel htmlFor="icon" className="input-area_image-input_label profile-icon" value="Profile Icon"/>
                        <InputLabel htmlFor="icon" className="input-area_image-input_uploader profile-icon"  />
                        <div className='input-area_text'>
                            <TextInputFile 
                                id="icon"
                                type="file"
                                name="icon"
                                onChange={handleImageChange}
                                autoComplete="icon"
                                className="icon"
                                placeholder=''
                            />               
                        </div>
                 
                        <div className='input-area_image-input_preview profile-icon'>
                            {previewIcon ? 
                                <img className='input-area_image-input_preview_img profile-icon' src={previewIcon} alt="" />
                            :
                                <GorillaIcon color_code={data.color_code} />
                            
                            }
                        </div>
                        
                        <InputError message={errors.thumbnail_image} />
                    </div>				
                </div>
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
		                    <InputLabel htmlFor="intro" value="Introduction" />
		                    <Textarea
		                        id="intro"
		                        onChange={(e) => setData('intro', e.target.value)}
		                        autoComplete="description"
		                     	content={data.intro}
                                maxLength={200}
                                placeholder="I enjoy exploring local flavors, hidden gems, and popular spots to find meals that leave a lasting impression. Let’s share our favorite food discoveries and inspire each other’s culinary journeys!"
		                    >
		                    
		                 	</Textarea>
		                    <InputError message={errors.intro} />
		                </div>
                <div className='input-area'>
                    <InputLabel htmlFor="gender" value="Gender" />
                    <TextSelect
                        id="gender"
                        value={data.gender}
                        onChange={(e) => setData('gender', e.target.value)}
                        autoComplete="gender"
                        required
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
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
                            if (e.target.value < 0)
                                e.target.value = 0;
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
                    <InputLabel htmlFor="locality_type" value="I am" />
                    <TextSelect
                        id="locality_type"
                        value={data.locality_type}
                        onChange={(e) => setData('locality_type', e.target.value)}
                        autoComplete="type"
                        required
                    >
                        {LocalityTypes.map((locality,i)=>(
                             <option key={i} value={i} >a {locality} in Rwanda</option>
                        ))}

                    </TextSelect>
                    <InputError message={errors.type} />
                </div>
                <PrimaryButton disabled={processing}>                     
                    Update
                </PrimaryButton>
               
            </form>
        </section>
    );
}


const goliraIcon = ` 



`