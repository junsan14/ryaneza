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
import { useImmer } from 'use-immer';
import { list } from 'postcss';
import { preconnect } from 'react-dom';



export default function CreateBistro(){
	const {bistro} = usePage().props;
	const initialPreviewImages =[
		{thumbnail_image:[{id:0, src:bistro?bistro.thumbnail_image[0]["src"]:"" }]},
		{kv_images:[
			{id:0, src:bistro?bistro.kv_images[0]["src"]:""},
			{id:1, src:bistro?bistro.kv_images[1]["src"]:""},
			{id:2, src:bistro?bistro.kv_images[2]["src"]:""},
			{id:3, src:bistro?bistro.kv_images[3]["src"]:""},
			{id:4, src:bistro?bistro.kv_images[4]["src"]:""},
			],
		},	
		{interior_slides:[]},
		{food_slides:[]},
		{menu_images:[]},

	]


	if(bistro){
		
		bistro.interior_slides && bistro.interior_slides.map((ele,i)=>{
   			initialPreviewImages[2]["interior_slides"][i] =
   				{id:i, src: bistro.interior_slides[i]["src"], remarks:bistro.interior_slides[i]["remarks"]}
   			
   		})

   		bistro.food_slides && bistro.food_slides.map((ele,i)=>{
   			initialPreviewImages[3]["food_slides"][i] =
   				{id:i, src: bistro.food_slides[i]["src"], remarks:bistro.food_slides[i]["remarks"]}
   		})
   		bistro.menu_images && bistro.menu_images.map((ele,i)=>{
   			initialPreviewImages[4]["menu_images"][i] = 
   				{id:i, src: bistro.menu_images[i]["src"]}
   		})
	}else{
		initialPreviewImages[2]["interior_slides"][0] ={id:0, src:"", remarks:""}
		initialPreviewImages[3]["food_slides"][0] ={id:0, src:"", remarks:""}
		initialPreviewImages[4]["menu_images"][0] ={id:0, src:"", remarks:""}
	}
	const [previewImages, setPreviewImages] = useImmer(initialPreviewImages);
	 //previewImages.splice(0,1)
	//console.log(previewImages)
	const { data, setData, post, processing, errors, reset } = useForm({
		id:bistro?bistro.id:"",
        name: bistro?bistro.name:'',
        description: bistro?bistro.description:'',
        province: bistro?bistro.province:0,
        district:bistro?bistro.district: 1,
        sector: bistro?bistro.sector:'',
        address: bistro?bistro.address:'',
        google_map: bistro?bistro.google_map:[],
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
        thumbnail_image:bistro?bistro.thumbnail_image: [
        	{id:0,"src":"storage/images/noimage.png"}
        ],
        
        kv_images:bistro?bistro.kv_images:
        [
        	{id:0,src:bistro?bistro.kv_images[0]["src"]:""},
        	{id:1,src:bistro?bistro.kv_images[1]["src"]:""},
        	{id:2,src:bistro?bistro.kv_images[2]["src"]:""},
        	{id:3,src:bistro?bistro.kv_images[3]["src"]:""},
        	{id:4,src:bistro?bistro.kv_images[4]["src"]:""},
        ],
        interior_slides:bistro?bistro.interior_slides:bistro?bistro.interior_slides:[{ id:0, src:"", remarks:""}],
        food_slides:bistro?bistro.food_slides:bistro?bistro.food_slides:[{ id: 0, src:"", remarks:""}],
        menu_images:bistro?bistro.menu_images:[
        	{id:0, src:""}
        	],
        seats_number:bistro?bistro.seats_number:0,
        min_price:bistro?bistro.min_price:1000,
        max_price:bistro?bistro.max_price:2000,
        payment_options:bistro?bistro.payment_options:Payment_options,
        reservation:bistro?bistro.reservation:0,
        keywords:bistro?bistro.keywords:"",
        is_edit:bistro?true:false,

    });

    const handleChangeData = (e)=>{
        setData(e.target.id, e.target.value);
        
    }
    const handleClickAddUploader = (e,dataname, name_id)=>{
    	e.preventDefault();
    	const arrayNum = data[dataname].length;
    	let propertyName;
    		setData(dataname,[
	    		...data[dataname],
	    		{ id: arrayNum, src:"", remarks:""}
	    	])
	    	propertyName = `${dataname}${arrayNum+1}`
    	
    	
    	setPreviewImages(data =>{
    		data[name_id][dataname][arrayNum] = { id: arrayNum, src:"", remarks:""};

    	})
    }
	const handleImageChange = (e,dataname,name,name_id,list_id) => {	
		//console.log(dataname, name, list_id)
		//Set image to Preview 
        const reader = new FileReader()
        reader.onload = function(event) {
		    // The file's text will be printed here
		    setPreviewImages(data =>{
	        	data[name_id][dataname][list_id]["src"] =event.target.result;
	        })
		 };

		  reader.readAsDataURL(event.target.files[0])
		  //save data
			setData(dataname, data[dataname].map((ele,i)=>{
			   	if(ele.id == list_id){
			   		return {
			   			...ele,
			   			src:e.target.files[0],
			   		}
			   	}else{
			   		return {...ele}
			   	}
			}))
    };
    const handleChangeRemarks = (e, dataname,name,name_id,list_id) =>{
    	//console.log(dataname, name, name_id, list_id)
    	//console.log(list_id)
	   setData(dataname, data[dataname].map((ele,i)=>{
		   	if(ele.id == list_id){
		   		return {
		   			...ele,
		   			remarks:e.target.value,
		   		}
		   	}else{
		   		return {...ele}
		   	}
		   }))   
	}

    const handleClickDeleteUploader = (e,dataname,name,name_id,list_id)=>{
    	 e.preventDefault();
		setPreviewImages(draft=>{
			const previewImages = draft[name_id][dataname];
			previewImages.map((previewImage,i)=>{
				if(i === list_id){
					previewImage.id = -1;
				}
				else if(i > list_id){
					previewImage.id = previewImage.id-1;
				}
			})
			
			//delete selected Image
			draft[name_id][dataname] = previewImages.filter(ele=>ele.id !== -1);
			
		})
        setData(dataname, 
			data[dataname].map((ele,i)=>{
				if(i === list_id){
					return{
						...data[dataname][ele.id],
						id:-1
					}
				}else if(i>list_id){
					return{
						...data[dataname][i],
						id:data[dataname][i].id-1
					}
				}else{
					return{...data[dataname][i]}
				}
			}).filter((ele)=>ele.id !== -1)
		)
    }
	const handleTogglePaymentMethod = (methodid,nextChecked)=>{
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
	            
	            <form onSubmit={submit} className='form' id="form" encType="multipart/form-data">
	            	<section className='section'>
		            	<h2 className='section_title'>Basic Info</h2>
		                <div className='input-area'>
		                    <InputLabel htmlFor="name" value="Bistro Name (Required)" />
		                    <TextInput 
		                        id="name"
		                        type="text"
		                        name="name"
		                        value={data.name}
		                        onChange={handleChangeData}
		                        autoComplete="name"
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
		                    <InputLabel htmlFor="google_map" value="Google Map latitude & longitude (Required)" />
		                    <TextInput
		                        id="google_map"
		                        value={data.google_map}
		                        onChange={(e)=>{			
									setData(e.target.id,e.target.value.split(","))
								}}
		                        autoComplete="google_map"
								placeholder="-1.943135666719068, 30.090251626156217"
								required
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
		                        className="multiple"
		                        onChange={(e)=>{
		                        	const updatedOptions = [...e.target.options]
								      .filter(option => option.selected)
								      .map(x => x.value);
								    setData(e.target.id,updatedOptions);
		                       } }
		                        multiple={true}
							   value={data.occasion}
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
		                        className="multiple"
		                        onChange={(e)=>{
		                        	const updatedOptions = [...e.target.options]
								      .filter(option => option.selected)
								      .map(x => x.value);
								    setData(e.target.id,updatedOptions);
		                       } }
		                        multiple={true}
							   value={data.ambience}
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
		                        className="multiple"
		                        onChange={(e)=>{
		                        	const updatedOptions = [...e.target.options]
								      .filter(option => option.selected)
								      .map(x => x.value);
								    setData(e.target.id,updatedOptions);
		                       } }
		                        multiple={true}
							   value={data.speciality}
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
							   value={data.time_occasion}
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
		                <h2 className='section_title'>サムネイル</h2>
		                <div className='input-area_image thumbnail_image'>
			                <div className='input-area_image-input'>
			                    <p className='input-area_image-input_title'>Thumbnail(Required)</p>
			                    <InputLabel htmlFor="thumbnail_image" className="input-area_image-input_uploader" value={!previewImages[0]["thumbnail_image"][0]["src"] && <FaImage />} />
			                    <div className='input-area_text'>
				                    <TextInputFile 
				                        id="thumbnail_image"
				                        type="file"
				                        name="thumbnail_image"
				                        onChange={(e, dataname="thumbnail_image",name="thumbnail_image", name_id=0, list_id=0 )=>handleImageChange(e,dataname,name,name_id,list_id)}
				                        autoComplete="thumbnail_image"
				                        className="thumbnail_image"
				                        placeholder=''
				                    />               
			                    </div>
			                    {previewImages &&
			                    <div className='input-area_image-input_preview'>
			                    	<img className='input-area_image-input_preview_img' src={previewImages[0]["thumbnail_image"][0]["src"]} alt="" />
			                    </div>
			                	}  
			                    <InputError message={errors.thumbnail_image} />
			                </div>				
		                </div>
		                <h2 className='section_title'>メイン写真</h2>
		                <div className='image-wrap'>
		                	{data.kv_images.map((kv,i)=>(
		                		<div className='input-area_image kv' key={i}>
					                <div className='input-area_image-input'>
					                	
					                	<p className='input-area_image-input_title'>Main Picture_{i+1}(Required)</p>
					                    <InputLabel htmlFor={`kv${i}`} className="input-area_image-input_uploader kv" value={!previewImages[1]["kv_images"][i]["src"] && <FaImage />} />
					                    <div className='input-area_text'>
						                    <TextInputFile 
						                        id={`kv${i}`} 
						                        type="file"
						                        onChange={(e, dataname="kv_images",name=`kv${i}`, name_id=1, list_id=i )=>handleImageChange(e,dataname,name,name_id,list_id)}
						                        autoComplete={`kv${i}`} 
						                    />               
					                    </div>
					                    {previewImages &&
					                    <div className='input-area_image-input_preview kv'>
					                    	<img className='input-area_image-input_preview_img kv' src={previewImages[1]["kv_images"][i]["src"]} alt="" />
					                    </div>
					                	} 
					                    <InputError message={errors.kv1} />
					                </div>
				                </div>
		                		))}
          
		                </div>
		                <h2 className='section_title'>店内</h2>
		              	<div className='image-wrap'>
		              	{(data.interior_slides) && 
			                <ImageUploader category="interior_slides" data={data} previewImages={previewImages} 
			                	    handleImageChange={handleImageChange} errors={errors} category_id={2}
			                	    handleChangeRemarks={handleChangeRemarks} handleClickDeleteUploader={handleClickDeleteUploader}
			               	/>
			             }
				            <button onClick={(e,dataname="interior_slides",name_id=2)=>handleClickAddUploader(e,dataname, name_id)} className='add-uploader'>
				               <CiCirclePlus />
				            </button>
			            </div>
			            <h2 className='section_title'>料理</h2>
			            <div className='image-wrap'>
		              	{(data.food_slides) && 
			                <ImageUploader category="food_slides" data={data} previewImages={previewImages} 
			                	    handleImageChange={handleImageChange} errors={errors} category_id={3}
			                	    handleChangeRemarks={handleChangeRemarks} handleClickDeleteUploader={handleClickDeleteUploader}
			               	/>
			             }
				            <button onClick={(e,dataname="food_slides",name_id=3)=>handleClickAddUploader(e,dataname, name_id)} className='add-uploader'>
				               <CiCirclePlus />
				            </button>
			            </div>
			            <h2 className='section_title'>メニュー</h2>
			            <div className='image-wrap'>
		              	{(data.menu_images) && 
			                <ImageUploader category="menu_images" data={data} previewImages={previewImages} 
			                	    handleImageChange={handleImageChange} errors={errors} portrait={true} category_id={4}
			                	    handleChangeRemarks={handleChangeRemarks} handleClickDeleteUploader={handleClickDeleteUploader}
			               	/>
			             }
				            <button onClick={(e,dataname="menu_images",name_id=4)=>handleClickAddUploader(e,dataname, name_id)} className='add-uploader'>
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


const ImageUploader = ({category,data,previewImages,handleImageChange,errors,category_id, handleChangeRemarks,handleClickDeleteUploader, portrait}) =>{


return(
	data[category].map((e,i)=>(
		<div className={`input-area_image interior_slides ${portrait && "portrait"}`} key={i}>
	        <div className='input-area_image-input'>
	        	{previewImages[category_id][category][i] && 
	        	<button className='input-area_image-input_close' 
	        			onClick={(e,dataname=category, name=`${category}${i}`, name_id=category_id, list_id=i)=>handleClickDeleteUploader(e,dataname,name,name_id,list_id)}>
	        			
	        	</button>}
	            <p className='input-area_image-input_title'>{`${category}_image_${i+1}`}</p>
	            <InputLabel htmlFor={`${category+i}_imagesrc`} className={`input-area_image-input_uploader ${portrait && "portrait"}`} value={!previewImages[category_id][category][i]["src"] && <FaImage />} />
	            <div className='input-area_text'>
	                <TextInputFile 
	                    id={`${category+i}_imagesrc`}
	                    type="file"
	                    onChange={(e, dataname=category, name=`${category}${i}`, name_id=category_id, list_id=i )=>handleImageChange(e,dataname,name,name_id,list_id)}
	                    autoComplete={`${category+i}_imagesrc`}
	                 
	                />               
	            </div>
	            {previewImages &&
	            <div className='input-area_image-input_preview'>
	            	<img className={`input-area_image-input_preview_img ${portrait && "portrait"}`} src={previewImages[category_id][category][i]["src"] } alt="" />
	            </div>
	        	} 
	        </div>
	        {category !== "menu_images" &&
		        <div className='input-area_image-remarks'>
		            <Textarea
		                id={`${category+i}_remarks`}
		                value={data[category][i]["remarks"]}
		                onChange={(e, dataname=category, name=`${category}${i}`, name_id=category_id, list_id=i )=>handleChangeRemarks(e,dataname,name,name_id,list_id)}
		                autoComplete={`${category+i}_remarks`}
		                type="text"
		                placeholder="remarks"
		            >
		            </Textarea>
		        </div>
	    	}
	        	<InputError message={errors.interiors_remarks} />
				<InputError message={errors.interiors_remarks} />
	    </div>

		))
	)
}





