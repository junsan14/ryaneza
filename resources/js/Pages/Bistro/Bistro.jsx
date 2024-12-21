import Layout, { ShowModal } from "@/Layouts/Layout";
import { usePage, Head,useForm, Link} from "@inertiajs/react"

import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';


import { useContext, useState } from "react"


import KigaliInformation from "../Admin/Shared/BistroForm/KigaliInfomation"
import { Reviews } from "./Partials/Reviews";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay,EffectCube,EffectFade,EffectCoverflow,EffectCards} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cards';


import { Payment_options, BistroGenres,Reservation, Dietary_restrictions, BistroStyles, Occasions, Ambiences, Time_occasions, BistroSpecialities } from "../Admin/Shared/BistroForm/Categories"

// import required modules
import {GiCoffeeCup} from 'react-icons/gi' 
import { IoFastFoodOutline, IoCafeOutline, IoRestaurantOutline, IoWineOutline, IoFishOutline } from "react-icons/io5"

import {MdOutlineBakeryDining, MdOutlineDinnerDining, MdOutlineFamilyRestroom, MdMoney} from 'react-icons/md'
import {LuVegan, LuDessert} from 'react-icons/lu'
import { GiSteak, GiHealthPotion, GiLovers, GiNoodles,GiCook } from "react-icons/gi"
import { FaBusinessTime, FaBirthdayCake } from "react-icons/fa"


import { CiLocationOn } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { PrimaryButton } from "@/Components/Button";
import { FaStar,FaStarHalf } from "react-icons/fa";


export default function Bistro(){
	const {bistro} = usePage().props;
	const {bistro_reviews} = usePage().props;
	const {auth} = usePage().props;
    const {} = useForm({id:"",});
	const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
	const google_map_position = bistro.google_map && {lat: Number(bistro.google_map[0]), lng: Number(bistro.google_map[1])}
	return(
		<Layout>
			<Head title={bistro.name} />
	        <div className='bistro others'>
	            <h1 className='title'> {bistro.name} </h1>
	            <p className="bistro_location">
	            	<CiLocationOn />
	            	{KigaliInformation["districts"][KigaliInformation["provinces"][bistro.province].toLowerCase()][bistro.district]}, 
	            	{KigaliInformation["provinces"][bistro.province]}
	            </p>
	            {(auth.user && auth.user.admin) ?(
	            <div className="bistro_btns">
					<button className="bistro_btns_edit">
						<Link href="/edit-bistro" data={{id:bistro.id}} >
							<CiEdit />
						</Link>
					</button>
					<button className="bistro_btns_delete">
						<Link id={bistro.id} onClick={(e)=>handleClickDelete(e)} >
							<MdOutlineDelete />
						</Link>
					</button>
				</div>
				):""}
	            <div className="kv">
	            	<div className="kv_main">
	            		<img src={bistro.kv_images[0]["src"]} alt="" className="kv_main_image"/>
	            	</div>
	            	<div className="kv_sub">
	            	{bistro.kv_images.map((kv,i)=>{
						if(i !== 0 ){
							return(
	            			<div className="kv_sub_item" key={i}>
	            			   <img src={kv["src"]} alt="" className="kv_sub_item_image"/>
					        </div>
					        )
						}
	            		})}
	            								            	
	            	</div>
	            </div>

	            <div className="description">
	            	{bistro.description}
	            </div>
	            {(bistro.interior_slides.filter(ele=>ele.src !== null).length !==0 ||bistro.food_slides.filter(ele=>ele.src !== null).length !==0)  &&
	            <section className="section">
	            	<h2 className="section_title">
	            		{(bistro.interior_slides && bistro.interior_slides.filter(ele=>ele.src !== null).length !==0) && "Ambiance "} 
	            		{(bistro.interior_slides && bistro.interior_slides.filter(ele=>ele.src !== null).length !==0 && bistro.food_slides && bistro.food_slides.filter(ele=>ele.src !== null).length !==0) && "& "}
	            		{bistro.food_slides && bistro.food_slides.filter(ele=>ele.src !== null).length !==0 && " Bites "} 
	            		in {bistro.name}</h2>
	            	<div className="photos">
	          			{bistro.interior_slides && bistro.interior_slides.filter(ele=>ele.src !== null).length !==0 &&
		            		<div className="photos_item ">
		            		 <h3 className="photos_item_title">Interiors</h3>
		            	        <Swiper
									effect={'cards'}
							        grabCursor={true}
							        modules={[EffectCards]}
							        className="mySwiper"
						        >
						        {bistro.interior_slides && bistro.interior_slides.map((interior,i)=>(
						        	<SwiperSlide key={i} >       
						              	<img src={interior["src"]} alt="" />
						              	<p>{interior["remarks"]}</p>
						             </SwiperSlide>
						        ))}
						        </Swiper>
					        </div>
				    	}
				    	{bistro.food_slides && bistro.food_slides.filter((ele)=>ele.src !==null).length !==0 &&
					        <div className="photos_item">
		            		 <h3 className="photos_item_title">Food</h3>
		            	        <Swiper
									effect={'cards'}
							        grabCursor={true}
							        modules={[EffectCards]}
							        className="mySwiper"
						        >
						        {bistro.food_slides && bistro.food_slides.map((food,i)=>(
						        	<SwiperSlide key={i} >       
						              	<img src={food["src"]} alt="" />
						              	<p>{food["remarks"]}</p>
						             </SwiperSlide>
						        ))}
						        </Swiper>
					        </div>   
				        }   
					</div>
					{bistro.menu_images &&bistro.menu_images.filter((ele)=>ele.src !==null).length !==0 &&
						<MenuArea images={bistro.menu_images} />
					}
					
	            </section>
	        	}
	            <section className="section">
	            	<h2 className="section_title">General Overview</h2>
	            	<div className="information">
		            	<div className="information_basic col">
		            		<dl>
		            			<dt>Name</dt>
		            			<dd>{bistro.name}</dd>
		            			<dt>Genre</dt>
		            			<dd>{BistroGenres[bistro.genre]}</dd>
								<dt>Style</dt>
		            			<dd>{BistroStyles[bistro.style]}</dd>
		            			{bistro.opening_hour && 
		            			<>
			            			<dt>Opening Hour</dt>
			            			<dd>{bistro.opening_hour}</dd>
			            		</>
			            		}
								{bistro.address && 
										<>
											<dt>Address</dt>
											<dd>{bistro.address}</dd>
										</>
									}
								{(bistro.mobile || bistro.email) && 
								<>
								<dt>Contact</dt>
									<dd>
										{bistro.mobile &&
										<a href={`tel:${bistro.mobile}`}>{bistro.mobile}</a>
										} <br />
										{bistro.email &&
										<a href={`mailto:${bistro.email}`}>{bistro.email}</a>
										}
									</dd>
								</>
							}
		            		</dl>
		            	</div>
		            	<div className="information_googlemap col">
							<APIProvider apiKey={API_KEY}>
								<Map
									style={{width: '100%', height: '100%'}}
									defaultCenter={google_map_position}
									defaultZoom={13}
									gestureHandling={'greedy'}
									disableDefaultUI={true}
								>
									<Marker position={google_map_position} />
								</Map>
							</APIProvider>
		            	</div>
	            	</div>
					<BistroMoreInfor bistro={bistro}/>
	            </section>
	            <Reviews bistro_reviews={bistro_reviews}/>
	            
	        </div>
		</Layout>
		)
}

function BistroMoreInfor({bistro}){
	const {handleClickShowModal} = useContext(ShowModal);
	return(
		<div>
			<PrimaryButton id="bistro-more-info" onClick={(e,content=bistro)=>handleClickShowModal(e,content)}>
				Learn More
			</PrimaryButton>
		</div>
	)
}

function BistroMoreinforModal(){
	const {modalContent} = useContext(ShowModal);
	const checkedPaymentOptions = modalContent.payment_options.filter(option=> option.checked == 1);


	return(
		<dl>
			<dt>Style</dt>
				<dd>{BistroStyles[modalContent.style]}</dd>
			<dt>Speciality</dt>
				<dd>
					{modalContent.speciality.map((ele,i)=>(
						<span key={i}>{BistroSpecialities[i]} {modalContent.speciality.length-1 !== i && ", " }</span>
					))}
				</dd>
			<dt>Occasion</dt>
				<dd>
					{modalContent.occasion.map((ele,i)=>(
						<span key={i}>{Occasions[i]} {modalContent.occasion.length-1 !== i && ", " }</span>
					))}
				</dd>
			<dt>Ambience</dt>
				<dd>
					{modalContent.ambience.map((ele,i)=>(
						<span key={i}>{Ambiences[i]} {modalContent.ambience.length-1 !== i && ", " }</span>
					))}
				</dd>
			<dt>Availability</dt>
				<dd>
					{modalContent.time_occasion.map((ele,i)=>(
						<span key={i}>{Time_occasions[i]} {modalContent.time_occasion.length-1 !== i && ", " }</span>
					))}
				</dd>
			<dt>Average Cost</dt>
				<dd>{(modalContent.min_price+modalContent.max_price)/2} RWF</dd>
			{modalContent.seats_number !=0 &&
			<>
				<dt>Number of the seats</dt>
				<dd>{modalContent.seats_number}</dd>
			</>
			}
			{checkedPaymentOptions.length !== 0 && 
				<>
					<dt>Payment Options</dt>
					<dd>
						{checkedPaymentOptions.map((seenOptions,i)=>(
									<span key={i}>
										{seenOptions["method"]}
										{(checkedPaymentOptions.length !== (i+1))&& ", "}
									</span>
								))
						}
					</dd>
				</>
			}
			<dt>Reservation</dt>
			<dd>{Reservation[modalContent.reservation]}</dd>
			<dt>Dietary Restriction</dt>
			<dd>{Dietary_restrictions[modalContent.dietary_restriction]}</dd>
		</dl>
	)
}


function MenuArea({images}){
	const {handleClickShowModal} = useContext(ShowModal);
	
	return(
		<div >
			{images && images.map((ele,i)=>(	
			<PrimaryButton key={i} onClick={(e,content=ele)=>handleClickShowModal(e,content)} 
				id="bistro-menu">
				Menu {images.length-1 !== i && ` #${i+1}`}
			</PrimaryButton>				
			))}
		</div> 
	)
}


const BistroMenuModal = ()=>{
	const {modalContent} = useContext(ShowModal)
	return(
			<>
			<img src={modalContent["src"]} />
			</>
		)

}



export {BistroMenuModal,BistroMoreinforModal};