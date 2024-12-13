import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { PrimaryButton } from '@/Components/Button';
import TextInput from '@/Components/TextInput';
import TextSelect from '@/Components/TextSelect';
import Textarea from '@/Components/Textarea';
import TextInputFile from '@/Components/TextInputFile';
import Layout from '@/Layouts/Layout';
import { Head, Link, useForm, usePage,router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import KigaliInformation from './Shared/BistroForm/KigaliInfomation';
import {BistroGenres, BistroSpecialities, BistroStyles, Time_occasions, Ambiences, Occasions,Dietary_restrictions, Payment_options, Reservation} from './Shared/BistroForm/Categories';
import { CiCirclePlus } from "react-icons/ci";
import { FaImage } from "react-icons/fa";



export default function CreateBistro(){
	const {bistro} = usePage().props;
	const imagePreviewPoints ={
		thumbnail:bistro?bistro.thumbnail:"",
		kv1:bistro?bistro.kvs_images["kv1"]:"",
		kv2:bistro?bistro.kvs_images["kv2"]:"",
		kv3:bistro?bistro.kvs_images["kv3"]:"",
		kv4:bistro?bistro.kvs_images["kv4"]:"",
		kv5:bistro?bistro.kvs_images["kv5"]:"",

	}

	if(bistro ){
	    bistro.points && bistro.points.map((point,i)=>{
	    	imagePreviewPoints[`point${i+1}_picture`] = bistro.points[i]["image"]
	    })
	    bistro.menu_images && bistro.menu_images.map((menu_image,i)=>{
	    	//console.log(menu_image)
	    	imagePreviewPoints[`menu_image${i+1}_picture`] = menu_image["image"]
	    })
	}
	
	const [imagePreview, setImagePreview] = useState(imagePreviewPoints);
	const { data, setData, post, processing, errors, reset } = useForm({
		id:bistro?bistro.id:"",
        name: bistro?bistro.name:'',
        description: bistro?bistro.description:'',
        province: bistro?bistro.province:0,
        district:bistro?bistro.district: 1,
        sector: bistro?bistro.sector:'',
        address: bistro?bistro.address:'',
        google_map: bistro?bistro.google_map:'',
        opening_hour: bistro?bistro.opening_hour:'',
        mobile: bistro?bistro.mobile:'',
        email: bistro?bistro.email:'',
        genre: bistro?bistro.genre:0,
        style: bistro?bistro.style:0,
        speciality: bistro?bistro.speciality:0,
        occasion: bistro?bistro.occasion:0,
        ambience:bistro?bistro.ambience:0,
        time_occasion: bistro?bistro.time_occasion:0,
        dietary_restriction: bistro?bistro.dietary_restriction:0,
        thumbnail:bistro?bistro.thumbnail: "storage/images/noimage.png",
        kvs_images:{
        	kv1:bistro?bistro.kvs_images["kv1"]:"",
        	kv2:bistro?bistro.kvs_images["kv2"]:"",
        	kv3:bistro?bistro.kvs_images["kv3"]:"",
        	kv4:bistro?bistro.kvs_images["kv4"]:"",
        	kv5:bistro?bistro.kvs_images["kv5"]:""
        },
        points:bistro?bistro.points:[{ id: `point1`, image:"", remarks:""}],
        menu_images:bistro?bistro.menu_images:[
        	{id:"menu_image1", image:""}
        	],
        seats_number:bistro?bistro.seats_number:0,
        min_price:bistro?bistro.min_price:1000,
        max_price:bistro?bistro.max_price:2000,
        payment_options:bistro?bistro.payment_options:Payment_options,
        reservation:bistro?bistro.reservation:0,
        keywords:bistro?bistro.keywords:"",
        is_edit:bistro?true:false,

    });
console.log(bistro)
    const handleChangeData = (e)=>{
        setData(e.target.id, e.target.value);
        
    }
    const handleClickAddUploader = (e)=>{
    	e.preventDefault();
    	const pointsNum = data.points.length;
    	const menuNum = data.menu_images.length;
    	let propertyName;

    	if(e.currentTarget.id.indexOf("point") > 0){
    		setData("points",[
	    		...data.points,
	    		{ id: `point${pointsNum+1}`, image:"", remarks:""}
	    	])
	    	propertyName = `point${pointsNum+1}_picture`
    	}else if(e.currentTarget.id.indexOf("menu") > 0){
   
    		setData("menu_images",[
	    		...data.menu_images,
	    		{id:`menu_image${menuNum+1}`, image:""}
	    	])
	    	propertyName = `menu_image${menuNum+1}`
    	}

    	setImagePreview({
    		...imagePreview,
    		[propertyName]:""
    	})
    	
    }
	const handleImageChange = (e) => {
		const key = e.target.id;
		console.log(key);
		//Set image to Preview 
        const reader = new FileReader()
          reader.onload = (e) => {
		     setImagePreview(data => ({
	            ...imagePreview,
	            [key]: e.target.result,
	        }))
		  }
		  reader.readAsDataURL(event.target.files[0])

		if(key === "thumbnail"){
			setData(key,e.target.files[0]);
		}else if(String(key).indexOf("kv") === 0){
				setData("kvs",{
	    		...data.kvs,
	    		[key]:e.target.files[0]
	    	})
		}else if(String(key).indexOf("point") === 0){
			const id = e.target.closest('.point').id;

			const nextPoints = data.points.map((point,i)=>{
			   	if(point.id === id){
			   		return {
			   			...point,
			   			image:e.target.files[0],
			   		}
			   	}else{
			   		return {...point}
			   	}
			   })
		   	setData("points",nextPoints)
		   	console.log(data.points)
		}
		else if(String(key).indexOf("menu") === 0){
			const id = e.target.closest('.menu').id;
			console.log(id);
			const nextMenu = data.menu_images.map((menu_image,i)=>{
			   	if(menu_image.id === id){
			   		return {
			   			...menu_image,
			   			image:e.target.files[0],
			   		}
			   	}else{
			   		return {...menu_image}
			   	}
			   })
		   	setData("menu_images",nextMenu)
		   	console.log(data.menu_images)
		}
						
    };
    const handleClickDeletePreview = (e)=>{
    	 e.preventDefault();
    	const key = e.target.value;
   
    	setImagePreview(data => ({
	            ...imagePreview,
	            [key]: "",
	     }))
    }
	const handleTogglePaymentMethod = (methodid,nextChecked)=>{
		/*
		data.payment_options.map((payment_option,i) => {
			(payment_option.id === methodid )&&(Payment_options[i].checked = nextChecked);
		
		})
		*/
		
		//setData('payment_options', Payment_options);
		setData('payment_options', data.payment_options.map((payment_option,i) => {
			if(payment_option.id === methodid ){
				return {
					...payment_option,
					checked : nextChecked
				}
			}else{
				return {...payment_option}
			}
		}))
	}
	const handleChangeRemarks = (e) =>{
	   const key = e.target.closest('.point').id;
	   console.log(key);
	   	const nextPoints = data.points.map((point,i)=>{
		   	if(point.id === key){
		   		return {
		   			...point,
		   			remarks:e.target.value,
		   		}
		   	}else{
		   		return {...point}
		   	}
		   })
	   	setData("points",nextPoints)
	   
	}
    const submit = (e) => {
        e.preventDefault();
         router.post(route('bistro.store'),data,{
         	preserveState:false,
         });
    };

	return (
        <Layout>
       		<Head title="Create Bistro" />
	        <div className='create process'>
	            <h1 className='main_title'> 
	                {bistro?"Edit ":"Create "}Bistro
	            </h1>
	            
	            <form onSubmit={submit} className='form' id="form" enctype="multipart/form-data">
	            	<section className='section'>
		            	<h2 className='section_title'>Basic Info</h2>
		                <div className='input-area'>
		                    <InputLabel htmlFor="name" value="Bistro Name" />
		                    <TextInput 
		                        id="name"
		                        type="text"
		                        name="name"
		                        value={data.name}
		                        onChange={handleChangeData}
		                        autoComplete="name"
		                        placeholder=''
		                        required
		                    />
		                    <InputError message={errors.name} />
		                </div>
		                <div className='input-area'>
		                    <InputLabel htmlFor="description" value="Description" />
		                    <Textarea
		                        id="description"
		                        onChange={handleChangeData}
		                        autoComplete="description"
		                     	content={data.description}
		                    >
		                    
		                 	</Textarea>
		                    <InputError message={errors.description} />
		                </div>
		                <div className='input-area'>
		                    <InputLabel htmlFor="province" value="Province" />
		                    <TextSelect
		                        id="province"
		                        value={data.province}
		                        onChange={handleChangeData}
		                        autoComplete="province"
		                        required
		                    >
		                    {KigaliInformation["provinces"].map((province,i)=>(
		                    		<option value={i} key={i}>{province}</option>
		                    	))}
		                    </TextSelect>
		                    <InputError message={errors.province} />
		                </div>
		                <div className='input-area'>
		                    <InputLabel htmlFor="district" value="District" />
		                    <TextSelect
		                        id="district"
		                        value={data.district}
		                        onChange={handleChangeData}
		                        autoComplete="district"
		                        required
		                    >
		                    {KigaliInformation["districts"][KigaliInformation["provinces"][data.province].toLowerCase()].map((district,i)=>(
		                    		<option value={i} key={i}>{district}</option>
		                    ))}
		                    </TextSelect>
		                    <InputError message={errors.district} />
		                </div>
		                <div className='input-area'>
		                    <InputLabel htmlFor="address" value="Address" />
		                    <TextInput
		                        id="address"
		                        value={data.address}
		                        onChange={handleChangeData}
		                        autoComplete="address"
		                    /> 
		                    <InputError message={errors.address} />
		                </div>
		                <div className='input-area'>
		                    <InputLabel htmlFor="google_map" value="Google Map URL" />
		                    <TextInput
		                        id="google_map"
		                        value={data.google_map}
		                        onChange={handleChangeData}
		                        autoComplete="google_map"
		                    /> 
		                    <InputError message={errors.google_map} />
		                </div>
		                <div className='input-area'>
		                    <InputLabel htmlFor="opening_hour" value="Opening Hour" />
		                    <TextInput
		                        id="opening_hour"
		                        value={data.opening_hour}
		                        onChange={handleChangeData}
		                        autoComplete="opening_hour"
		                    /> 
		                    <InputError message={errors.opening_hour} />
		                </div>
		                <div className='input-area'>
		                    <InputLabel htmlFor="mobile" value="Mobile" />
		                    <TextInput
		                        id="mobile"
		                        value={data.mobile}
		                        onChange={handleChangeData}
		                        autoComplete="mobile"
		                    /> 
		                    <InputError message={errors.mobile} />
		                </div>
		                <div className='input-area'>
		                    <InputLabel htmlFor="email" value="Email" />
		                    <TextInput
		                        id="email"
		                        value={data.email}
		                        onChange={handleChangeData}
		                        autoComplete="email"
		                        type="email"
		                    /> 
		                    <InputError message={errors.email} />
		                </div>
	                </section>
	                <section className='section'>
		                <h2 className='section_title'>Category Info</h2>
		                <div className='input-area'>
		                    <InputLabel htmlFor="genre" value="Cuisine-Based" />
		                    <TextSelect
		                        id="genre"
		                        value={data.genre}
		                        onChange={handleChangeData}
		                        autoComplete="genre"
		                        required
		                    >
		                    {BistroGenres.map((bistroGenre,i)=>(
		                    	<option value={i} key={i}>{bistroGenre}</option>
		                    	))}
		                    </TextSelect>
		                    <InputError message={errors.genre} />
		                </div>
		                <div className='input-area'>
		                    <InputLabel htmlFor="style" value="Style-Based" />
		                    <TextSelect
		                        id="style"
		                        value={data.style}
		                        onChange={handleChangeData}
		                        autoComplete="style"
		                        required
		                    >
		                    {BistroStyles.map((BistroStyle,i)=>(
		                    	<option value={i} key={i}>{BistroStyle}</option>
		                    	))}
		                    </TextSelect>
		                    <InputError message={errors.style} />
		                </div>
		                <div className='input-area'>
		                    <InputLabel htmlFor="occasion" value="Occasion" />
		                    <TextSelect
		                        id="occasion"
		                        value={data.occasion}
		                        onChange={handleChangeData}
		                        autoComplete="occasion"
		                        required
		                    >
		                    {Occasions.map((occasion,i)=>(
		                    	<option value={i} key={i}>{occasion}</option>
		                    	))}
		                    </TextSelect>
		                    <InputError message={errors.speciality} />
		                </div>
		                <div className='input-area'>
		                    <InputLabel htmlFor="ambience" value="Ambience" />
		                    <TextSelect
		                        id="ambience"
		                        value={data.ambience}
		                        onChange={handleChangeData}
		                        autoComplete="ambience"
		                        required
		                    >
		                    {Ambiences.map((ambience,i)=>(
		                    	<option value={i} key={i}>{ambience}</option>
		                    	))}
		                    </TextSelect>
		                    <InputError message={errors.speciality} />
		                </div>
		                <div className='input-area'>
		                    <InputLabel htmlFor="speciality" value="Specialty Menu" />
		                    <TextSelect
		                        id="speciality"
		                        value={data.speciality}
		                        onChange={handleChangeData}
		                        autoComplete="speciality"
		                        required
		                    >
		                    {BistroSpecialities.map((BistroSpeciality,i)=>(
		                    	<option value={i} key={i}>{BistroSpeciality}</option>
		                    	))}
		                    </TextSelect>
		                    <InputError message={errors.speciality} />
		                </div>
		                <div className='input-area'>
		                    <InputLabel htmlFor="time_occasion" value="Time Occasion" />
		                    <TextSelect
		                        id="time_occasion"
		                        className="multiple"
		                        onChange={(e)=>{
		                        	const updatedOptions = [...e.target.options]
								      .filter(option => option.selected)
								      .map(x => x.value);
								    setData(e.target.id,updatedOptions);
		                       } }
		                        multiple={true}
		                 
		                    >
		                    {Time_occasions.map((time_occasion,i)=>(
		                    	<option value={i} key={i}>{time_occasion}</option>
		                    	))}
		                    </TextSelect>
		                    <InputError message={errors.time_occasion} />
		                </div>
		                <div className='input-area'>
		                    <InputLabel htmlFor="dietary_restriction" value="Dietary Restriction" />
		                    <TextSelect
		                        id="dietary_restriction"
		                        value={data.dietary_restriction}
		                        onChange={handleChangeData}
		                        autoComplete="dietary_restriction"
		                    >
		                    {Dietary_restrictions.map((dietary_restriction,i)=>(
		                    	<option value={i} key={i}>{dietary_restriction}</option>
		                    	))}
		                    </TextSelect>
		                </div>
	                </section>
	                <section className='section'>
		                <h2 className='section_title'>Pictures</h2>
		                <div className='input-area_image thumbnail'>
			                <div className='input-area_image-input'>
			                	{imagePreview["thumbnail"] && 
			                	<button className='input-area_image-input_close' value="thumbnail" onClick={handleClickDeletePreview}></button>}
			                    <p className='input-area_image-input_title'>Thumbnail</p>
			                    <InputLabel htmlFor="thumbnail" className="input-area_image-input_uploader" value={!imagePreview["thumbnail"] && <FaImage />} />
			                    <div className='input-area_text'>
				                    <TextInputFile 
				                        id="thumbnail"
				                        type="file"
				                        name="thumbnail"
				                        onChange={handleImageChange}
				                        autoComplete="thumbnail"
				                        className="thumbnail"
				                        placeholder=''
				                    />               
			                    </div>
			                    {imagePreview &&
			                    <div className='input-area_image-input_preview'>
			                    	<img className='input-area_image-input_preview_img' src={imagePreview["thumbnail"]} alt="" />
			                    </div>
			                	}  
			                    <InputError message={errors.thumbnail} />
			                </div>				
		                </div>

		                <div className='image-wrap'>
		                	<div className='input-area_image kv'>
				                <div className='input-area_image-input'>
				                	{imagePreview["kv1"] && 
				                	<button className='input-area_image-input_close kv' value="kv1" onClick={handleClickDeletePreview}></button>}
				                	<p className='input-area_image-input_title'>Main Picture1</p>
				                    <InputLabel htmlFor="kv1" className="input-area_image-input_uploader kv" value={!imagePreview["kv1"] && <FaImage />} />
				                    <div className='input-area_text'>
					                    <TextInputFile 
					                        id="kv1"
					                        type="file"
					                        name="kv1"
					                        onChange={handleImageChange}
					                        autoComplete="thumbnail"
					                        placeholder=''
					                        className="kv"
					                    />               
				                    </div>
				                    {imagePreview &&
				                    <div className='input-area_image-input_preview kv'>
				                    	<img className='input-area_image-input_preview_img kv' src={imagePreview["kv1"]} alt="" />
				                    </div>
				                	} 

				                    <InputError message={errors.kv1} />
				                </div>
			                </div>
			                <div className='input-area_image kv'>
				                <div className='input-area_image-input'>
				                	{imagePreview["kv2"] && 
				                	<button className='input-area_image-input_close kv' value="kv2" onClick={handleClickDeletePreview}></button>}
				                    <p className='input-area_image-input_title'>Main Picture2</p>
				                    <InputLabel htmlFor="kv2" className="input-area_image-input_uploader kv" value={!imagePreview["kv2"] && <FaImage />} />
				                    <div className='input-area_text'>
					                    <TextInputFile 
					                        id="kv2"
					                        type="file"
					                        name="kv2"
					                        onChange={handleImageChange}
					                        autoComplete="thumbnail"
					                        placeholder=''
					                        className="kv"
					                    />               
				                    </div>
				                    {imagePreview &&
				                    <div className='input-area_image-input_preview kv'>
				                    	<img className='input-area_image-input_preview_img kv' src={imagePreview["kv2"]} alt="" />
				                    </div>
				                	} 

				                    <InputError message={errors.kv2} />
				                </div>
			                </div>
			                <div className='input-area_image kv'>
				                <div className='input-area_image-input'>
				                	{imagePreview["kv3"] && 
				                	<button className='input-area_image-input_close kv' value="kv3" onClick={handleClickDeletePreview}></button>}
				                    <p className='input-area_image-input_title'>Main Picture3</p>
				                    <InputLabel htmlFor="kv3" className="input-area_image-input_uploader kv" value={!imagePreview["kv3"] && <FaImage /> } />
				                    <div className='input-area_text'>
					                    <TextInputFile 
					                        id="kv3"
					                        type="file"
					                        name="kv3"
					                        onChange={handleImageChange}
					                        autoComplete="thumbnail"
					                        placeholder=''
					                        className="kv"
					                    />               
				                    </div>
				                    {imagePreview &&
				                    <div className='input-area_image-input_preview kv'>
				                    	<img className='input-area_image-input_preview_img kv' src={imagePreview["kv3"]} alt="" />
				                    </div>
				                	} 

				                    <InputError message={errors.kv3} />
				                </div>
			                </div>
			                <div className='input-area_image kv'>
				                <div className='input-area_image-input'>
				                	{imagePreview["kv4"] && 
				                	<button className='input-area_image-input_close kv' value="kv4" onClick={handleClickDeletePreview}></button>}
				                    <p className='input-area_image-input_title'>Main Picture4</p>
				                    <InputLabel htmlFor="kv4" className="input-area_image-input_uploader kv" value={!imagePreview["kv4"] && <FaImage /> } />
				                    <div className='input-area_text'>
					                    <TextInputFile 
					                        id="kv4"
					                        type="file"
					                        name="kv4"
					                        onChange={handleImageChange}
					                        autoComplete="thumbnail"
					                        placeholder=''
					                        className="kv"
					                    />               
				                    </div>
				                    {imagePreview &&
				                    <div className='input-area_image-input_preview kv'>
				                    	<img className='input-area_image-input_preview_img kv' src={imagePreview["kv4"]} alt="" />
				                    </div>
				                	} 

				                    <InputError message={errors.kv4} />
				                </div>
			                </div>
			                <div className='input-area_image kv'>
				                <div className='input-area_image-input'>
				                	{imagePreview["kv5"] && 
				                	<button className='input-area_image-input_close kv' value="kv5" onClick={handleClickDeletePreview}></button>}
				                    <p className='input-area_image-input_title'>Main Picture5</p>
				                    <InputLabel htmlFor="kv5" className="input-area_image-input_uploader kv" value={!imagePreview["kv5"] && <FaImage /> } />
				                    <div className='input-area_text'>
					                    <TextInputFile 
					                        id="kv5"
					                        type="file"
					                        name="kv5"
					                        onChange={handleImageChange}
					                        autoComplete="thumbnail"
					                        placeholder=''
					                        className="kv"
					                    />               
				                    </div>
				                    {imagePreview &&
				                    <div className='input-area_image-input_preview kv'>
				                    	<img className='input-area_image-input_preview_img kv' src={imagePreview["kv5"]} alt="" />
				                    </div>
				                	} 

				                    <InputError message={errors.kv5} />
				                </div>
			                </div>            
		                </div>
	
			            <h2 className='section_title'>Points</h2>
			              	<div className='image-wrap'>
			              	{(data.points) && 
				                <PointsUploader data={data} imagePreview={imagePreview} 
				                	    handleImageChange={handleImageChange} errors={errors} 
				                	    handleChangeRemarks={handleChangeRemarks} handleClickDeletePreview={handleClickDeletePreview}
				               	/>
				             }
				            <button onClick={handleClickAddUploader} className='add-uploader' id="add-point-uploader">
				               <CiCirclePlus />
				            </button>
			            </div>
			            <h2 className='section_title'>Menus</h2>
			            <div className='image-wrap'>
			              	{(data.menu_images) && 
				                <MenuUploader data={data} imagePreview={imagePreview} 
				                	    handleImageChange={handleImageChange} errors={errors} 
				                	    handleChangeRemarks={handleChangeRemarks} handleClickDeletePreview={handleClickDeletePreview}
				               	/>
				             }
				            <button onClick={handleClickAddUploader} className='add-uploader' id="add-menu-uploader">
				               <CiCirclePlus />
				            </button>
			            </div>
	                </section>
	                <section className='section'>
		                <h2 className='section_title'>Ohters</h2>
		                <div className='input-area'>
		                    <InputLabel htmlFor="seats_number" value="Seats Number" />
		                    <TextInput 
		                        id="seats_number"
		                        type="number"
		                        name="seats_number"
		                        value={data.seats_number}
		                        onChange={handleChangeData}
		                        autoComplete="seats_number"
		                        placeholder=''
		                    />
		                    <InputError message={errors.seats_number} />
		                </div>
		                <div className='input-area'>
		                    <InputLabel htmlFor="min_price" value="Minumun Price" />
		                    <TextInput 
		                        id="min_price"
		                        type="number"
		                        name="min_price"
		                        value={data.min_price}
		                        onChange={handleChangeData}
		                        autoComplete="min_price"
		                        placeholder=''
		                    />
		                    <InputError message={errors.min_price} />
		                </div>
		                <div className='input-area'>
		                    <InputLabel htmlFor="max_price" value="Maximum Price" />
		                    <TextInput 
		                        id="max_price"
		                        type="number"
		                        name="max_price"
		                        value={data.max_price}
		                        onChange={handleChangeData}
		                        autoComplete="max_price"
		                        placeholder=''
		                    />
		                    <InputError message={errors.max_price} />
		                </div>
		                
		                <div className='input-area'>
		                    <InputLabel htmlFor="payment_option" value="Payment Option" />
		                    <div className="input-area flex">
		                        {data.payment_options.map((payment_option,i)=>(
		                        	<div className='checkbox-item' key={i}>
		                        		<Checkbox type='checkbox'
				                            id={payment_option.method.toLowerCase()}
				                            name={payment_option.method.toLowerCase()}
				                            checked={Boolean(Number(payment_option.checked))}
				                            onChange={(e) =>{
				                            	handleTogglePaymentMethod(payment_option.id,e.target.checked);
				                            
				                            }}
				                        />
				                        <InputLabel htmlFor={payment_option.method.toLowerCase()} value={payment_option.method} />
		                        	</div>
		                        	))}
			                </div>

		                    <InputError message={errors.payment_option} />
		                </div>
		                <div className='input-area'>
		                    <InputLabel htmlFor="reservation" value="Reservation" />
		                    <TextSelect
		                        id="reservation"
		                        value={data.reservation}
		                        onChange={handleChangeData}
		                        autoComplete="reservation"
		                    >
		                    {Reservation.map((reservation,i)=>(
		                    	<option value={i} key={i}>{reservation}</option>
		                    	))}
		                    </TextSelect>
		                    <InputError message={errors.reservation} />
		                </div>
		                <div className='input-area'>
		                    <InputLabel htmlFor="keywords" value="Keywords" />
		                    <TextInput 
		                        id="keywords"
		                        type="text"
		                        name="keywords"
		                        value={data.keywords}
		                        onChange={handleChangeData}
		                        autoComplete="keywords"
		                        placeholder=''
		                    />
		                    <InputError message={errors.keywords} />
		                </div>
	                </section>
	                <PrimaryButton disabled={processing} form="form">
	                    {bistro?"Update":"Create"}
	                </PrimaryButton>
	            </form>

            </div>
        </Layout>
    );
}


const PointsUploader = ({data,imagePreview,handleImageChange,errors, handleChangeRemarks,handleClickDeletePreview}) =>{
return(
	data.points.map((point,i)=>(
		<div className='input-area_image point' id={`point${i+1}`}>
	        <div className='input-area_image-input'>
	        	{imagePreview[`point${i+1}_picture`] && 
	        	<button className='input-area_image-input_close' value={`point${i+1}_picture`} onClick={handleClickDeletePreview}></button>}
	            <p className='input-area_image-input_title'>{`Point${i+1}`}</p>
	            <InputLabel htmlFor={`point${i+1}_picture`} className="input-area_image-input_uploader" value={!imagePreview[`point${i+1}_picture`] && <FaImage />} />
	            <div className='input-area_text'>
	                <TextInputFile 
	                    id={`point${i+1}_picture`}
	                    type="file"
	                    name={`point${i+1}_picture`}
	                    onChange={handleImageChange}
	                    autoComplete={`point${i+1}_picture`}
	                    placeholder=''
	                 
	                />               
	            </div>
	            {imagePreview &&
	            <div className='input-area_image-input_preview'>
	            	<img className='input-area_image-input_preview_img' src={imagePreview[`point${i+1}_picture`]} alt="" />
	            </div>
	        	} 
	        </div>
	        <div className='input-area_image-remarks'>
	            <Textarea
	                id={`point${i+1}_remarks`}
	                name={`point${i+1}_remarks`}
	                value={data.points[i]["remarks"]}
	                onChange={handleChangeRemarks}
	                autoComplete={`point${i+1}_remarks`}
	                type="text"
	                placeholder="remarks"
	            >
	            </Textarea>
	        </div>
	        	<InputError message={errors.point_picture} />
				<InputError message={errors.point_remarks} />
	    </div>

		))
	)
}

const MenuUploader = ({data,imagePreview,handleImageChange,errors, handleChangeRemarks,handleClickDeletePreview}) =>{
return(
	data.menu_images.map((menu_image,i)=>(
		<div className='input-area_image menu' id={`menu_image${i+1}`} >
	        <div className='input-area_image-input'>
	        	{imagePreview[`menu_image${i+1}_picture`] && 
	        	<button className='input-area_image-input_close' value={`menu_image${i+1}_picture`} onClick={handleClickDeletePreview}></button>}
	            <p className='input-area_image-input_title'>{`menu${i+1}_picture`}</p>
	            <InputLabel htmlFor={`menu_image${i+1}_picture`} className="input-area_image-input_uploader" value={!imagePreview[`menu_image${i+1}_picture`] && <FaImage />} />
	            <div className='input-area_text'>
	                <TextInputFile 
	                    id={`menu_image${i+1}_picture`}
	                    type="file"
	                    name={`menu_image${i+1}_picture`}
	                    onChange={handleImageChange}
	                    autoComplete={`menu_image${i+1}_picture`}
	                    placeholder=''
	                 
	                />               
	            </div>
	            {imagePreview &&
	            <div className='input-area_image-input_preview'>
	            	<img className='input-area_image-input_preview_img' src={imagePreview[`menu_image${i+1}_picture`]} alt="" />
	            </div>
	        	} 
	        </div>
	        	<InputError message={errors.menu_image} />
	    </div>

		))
	)
}



