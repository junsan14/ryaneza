import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextSelect from '@/Components/TextSelect';
import Textarea from '@/Components/Textarea';
import {PrimaryButton} from '@/Components/Button';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm,router, usePage, useRemember} from '@inertiajs/react';
import { Rating } from 'react-simple-star-rating'
import { useContext, useEffect, useState } from 'react';
import { Occasions } from '@/Pages/Admin/Shared/BistroForm/Categories';
import { ShowModal } from '@/Layouts/Layout';

export default function CreateReviewModal(){
    const {errors} = usePage().props;
    const {handleClickHideModal} = useContext(ShowModal)
    const [formState, setFormState] = useRemember({
        isEdit:false,
        bistro_id:usePage().props.bistro.id,
        situation:"0",
        food_rate:3,
        service_rate:3,
        ambience_rate:3,
        value_rate:3,
        convenience_rate:3,
        uniqueness_rate:3,
        overall_rate:3,
        visited_date:"",
        howmany:1,
        cost:10000,
        comment:"",
    },'Bistro/CreateReview')
    const form = useForm('Bistro/CreateReview',formState);

    const submit = (e) => {
        e.preventDefault();
         router.post(route('review.store'),form.data,{
            onSuccess:handleClickHideModal,
         });   
    };
    return(
        <>
             <h1 className='main_title'> 
                Write a Review 
            </h1>
            <form onSubmit={submit} className='form' id="form">
                <div className='input-area'>
                    <div className='input-area_rate'>
                        <InputLabel htmlFor="food_rate" value="Food" />
                        <div className='input-area_rate_stars'>
                            <Rating
                                allowFraction={true}   
                                onClick={(rate)=>form.setData("food_rate", rate)}
                                initialValue={form.data.food_rate}
                            />
                        </div>
                    </div>
                </div>
                <div className='input-area'>
                    <div className='input-area_rate'>
                        <InputLabel htmlFor="service_rate" value="Service" />
                        <div className='input-area_rate_stars'>
                            <Rating
                                allowFraction={true}
                                onClick={(rate)=>form.setData("service_rate", rate)}
                                initialValue={form.data.service_rate}
                            />
                        </div>
                    </div>
                </div>
                <div className='input-area'>
                    <div className='input-area_rate'>
                        <InputLabel htmlFor="ambience_rate" value="Ambience" />
                        <div className='input-area_rate_stars'>
                            <Rating
                                allowFraction={true}
                                onClick={(rate)=>form.setData("ambience_rate", rate)}
                                initialValue={form.data.ambience_rate}
                            />
                        </div>
                    </div>
                </div>
                <div className='input-area'>
                    <div className='input-area_rate'>
                        <InputLabel htmlFor="value_rate" value="Value" />
                        <div className='input-area_rate_stars'>
                            <Rating
                                allowFraction={true}
                                onClick={(rate)=>form.setData("value_rate", rate)}
                                initialValue={form.data.value_rate}
                            />
                        </div>
                    </div>
                </div>
                <div className='input-area'>
                    <div className='input-area_rate'>
                        <InputLabel htmlFor="convenience_rate" value="Covenience" />
                        <div className='input-area_rate_stars'>
                            <Rating
                                allowFraction={true}
                                onClick={(rate)=>form.setData("convenience_rate", rate)}
                                initialValue={form.data.convenience_rate}
                            />
                        </div>
                    </div>
                </div>
                <div className='input-area'>
                    <div className='input-area_rate'>
                        <InputLabel htmlFor="uniqueness_rate" value="Uniquness" />
                        <div className='input-area_rate_stars'>
                            <Rating
                                allowFraction={true}
                                onClick={(rate)=>form.setData("uniqueness_rate", rate)}
                                initialValue={form.data.uniqueness_rate}
                            />
                        </div>
                    </div>
                </div>
                <div className='input-area'>
                    <div className='input-area_rate'>
                    <InputLabel htmlFor="overall_rate" value="Overall" />
                    <div className='input-area_rate_stars'>
                            <Rating
                                onClick={(rate)=>form.setData("overall_rate", rate)}
                                initialValue={form.data.overall_rate}
                            />
                    </div>
                    </div>
                </div>
                <div className='input-area'>
                    <InputLabel htmlFor="visited_date" value="Visited Date" />
                    <TextInput 
                        id="visited_date"
                        type="date"
                        name="visited_date"
                        value={form.data.visited_date}
                        onChange={(e)=>form.setData(e.target.id, e.target.value)}
                        autoComplete="visited_date"
                        placeholder=''
                        required
                        max={maxDate()}
                    />
                    <InputError message={errors.visited_date} />
                </div>
                <div className='input-area'>
                    <InputLabel htmlFor="situation" value="Situation" />
                    <TextSelect 
                        id="situation"
                        type="text"
                        name="situation"
                        value={form.data.situation}
                        onChange={(e)=>{
                            const id = e.target.id;
                            const value = e.target.value;
                            if(value == 0){
                                form.setData({
                                    ...form.data,
                                    [id]:e.target.value,
                                    "howmany":1
                                })
                            }else{
                                form.setData({
                                    ...form.data,
                                    [id]:e.target.value,
                                    "howmany":2
                                })
                            }
                            
                        }}
                        autoComplete="situation"
                        placeholder=''
                        required
                    >
                        {Occasions.map((occasion,i)=>(
                            <option value={i} key={i}>{occasion}</option>
                        ))}
                    </TextSelect>
                    <InputError message={errors.situation} />
                </div>
                {(form.data.situation != 0 && form.data.situation != 1) &&
                <div className='input-area'>
                    <InputLabel htmlFor="howmany" value="How many people" />
                    <TextInput 
                        id="howmany"
                        type="number"
                        name="howmany"
                        value={form.data.situation == 1 ?2:form.data.howmany}
                        onChange={(e)=>{
                            if (e.target.value < 0 ||  e.target.value > 100) e.target.value = "";
                            form.setData(e.target.id, e.target.value)
                        }}
                        autoComplete="howmany"
                        placeholder=''
                        required
                    />
                    <InputError message={errors.howmany} />
                </div>
                }

                <div className='input-area'>
                    <InputLabel htmlFor="cost" value="Spent Cost" />
                    <TextInput 
                        id="cost"
                        type="number"
                        name="cost"
                        value={form.data.cost}
                        onChange={(e)=>{
                            if (e.target.value < 0) e.target.value = 0;
                            form.setData(e.target.id, e.target.value)
                        }}
                        autoComplete="cost"
                        placeholder=''
                        required
                    />
                    <InputError message={errors.cost} />
                </div>
                <div className='input-area'>
                    <InputLabel htmlFor="comment" value="Comment" />
                    <Textarea 
                        id="comment"
                        type="date"
                        name="comment"
                        onChange={(e)=>form.setData(e.target.id, e.target.value)}
                        autoComplete="visited_date"
                        placeholder=''
                        value={form.data.comment}
                    >
                        {form.data.comment}
                    </Textarea>
                    <InputError message={errors.visited_date} />
                </div>

                <PrimaryButton disabled={form.processing} >
                    Submit
                </PrimaryButton>
            </form>
        
        
        </>


    )
}

const maxDate = ()=>{
    let dtToday = new Date();
    let year = dtToday.getFullYear();
    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate();

    if(month < 10){
        month = '0' + month.toString();
    }else if(month === 13){
        month = "01";
    } 
    if(day < 10)
        day = '0' + day.toString();
    let maxDate = year + '-' + month + '-' + day;    
    return  maxDate;
}

