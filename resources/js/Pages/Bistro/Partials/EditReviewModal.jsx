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

export default function EditReviewModal(){
    const {errors} = usePage().props;
    const {modalContent} = useContext(ShowModal);
    const {bistro_review} = modalContent;
    const {handleClickHideModal} = useContext(ShowModal)
    const {data, setData,processing} = useForm({
        isEdit:true,
        bistro_id:bistro_review.id,
        situation:bistro_review.situation,
        food_rate:bistro_review.food_rate,
        service_rate:bistro_review.service_rate,
        ambience_rate:bistro_review.ambience_rate,
        value_rate:bistro_review.value_rate,
        convenience_rate:bistro_review.convenience_rate,
        uniqueness_rate:bistro_review.uniqueness_rate,
        overall_rate:bistro_review.overall_rate,
        visited_date:bistro_review.visited_date,
        howmany:bistro_review.howmany,
        cost:bistro_review.cost,
        comment:bistro_review.comment,
    })
   
   /*
    useEffect(()=>{
        setData('comment', bistro_review.comment)
    },[bistro_review])
*/
    const submit = (e) => {
        e.preventDefault();
         router.post(route('review.store'),data,{
            onSuccess:handleClickHideModal,
         });
        
        
    };
    return(
        <>
             <h1 className='main_title'> 
                Edit a Review 
            </h1>
            <form onSubmit={submit} className='form' id="form">
                <div className='input-area'>
                    <div className='input-area_rate'>
                        <InputLabel htmlFor="food_rate" value="Food" />
                        <div className='input-area_rate_stars'>
                            <Rating
                                allowFraction={true}   
                                onClick={(rate)=>setData("food_rate", rate)}
                                initialValue={data.food_rate}
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
                                onClick={(rate)=>setData("service_rate", rate)}
                                initialValue={data.service_rate}
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
                                onClick={(rate)=>setData("ambience_rate", rate)}
                                initialValue={data.ambience_rate}
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
                                onClick={(rate)=>setData("value_rate", rate)}
                                initialValue={data.value_rate}
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
                                onClick={(rate)=>setData("convenience_rate", rate)}
                                initialValue={data.convenience_rate}
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
                                onClick={(rate)=>setData("uniqueness_rate", rate)}
                                initialValue={data.uniqueness_rate}
                            />
                        </div>
                    </div>
                </div>
                <div className='input-area'>
                    <div className='input-area_rate'>
                    <InputLabel htmlFor="overall_rate" value="Overall" />
                    <div className='input-area_rate_stars'>
                            <Rating
                                onClick={(rate)=>setData("overall_rate", rate)}
                                initialValue={data.overall_rate}
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
                        value={data.visited_date}
                        onChange={(e)=>setData(e.target.id, e.target.value)}
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
                        value={data.situation}
                        onChange={(e)=>{
                            const id = e.target.id;
                            const value = e.target.value;
                            if(value == 0){
                                setData({
                                    ...data,
                                    [id]:e.target.value,
                                    "howmany":1
                                })
                            }else{
                                setData({
                                    ...data,
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
                            <option value={i}>{occasion}</option>
                        ))}
                    </TextSelect>
                    <InputError message={errors.situation} />
                </div>
                {(data.situation != 0 && data.situation != 1) &&
                <div className='input-area'>
                    <InputLabel htmlFor="howmany" value="How many people" />
                    <TextInput 
                        id="howmany"
                        type="number"
                        name="howmany"
                        value={data.howmany}
                        onChange={(e)=>{
                            if (e.target.value < 0 ||  e.target.value > 100) e.target.value = "";
                            setData(e.target.id, e.target.value)
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
                        value={data.cost}
                        onChange={(e)=>{
                            if (e.target.value < 0) e.target.value = 0;
                            setData(e.target.id, e.target.value)
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
                        onChange={(e)=>setData(e.target.id, e.target.value)}
                        autoComplete="visited_date"
                        placeholder=''
                        value={data.comment}
                    >
                        {data.comment}
                    </Textarea>
                    <InputError message={errors.visited_date} />
                </div>

                <PrimaryButton disabled={processing} >
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

