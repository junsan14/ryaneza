import GuestLayout from "@/Layouts/GuestLayout"
import { usePage, Head,useForm, Link} from "@inertiajs/react"
import bistro00 from '../../../img/bistro00.webp'
import bistro01 from '../../../img/bistro01.png'

import { useState } from "react"
import { CgProfile} from 'react-icons/cg';

import KigaliInformation from "../Admin/Shared/BistroForm/KigaliInfomation"
import Modal from "@/Components/Modal"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay,EffectCube,EffectFade,EffectCoverflow} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

import { Payment_options, BistroGenres,Reservation, Dietary_restrictions } from "../Admin/Shared/BistroForm/Categories"

// import required modules
import {GiCoffeeCup} from 'react-icons/gi' 
import { IoFastFoodOutline, IoCafeOutline, IoRestaurantOutline, IoWineOutline, IoFishOutline } from "react-icons/io5"
import { IoIosRestaurant } from "react-icons/io";
import {MdOutlineBakeryDining, MdOutlineDinnerDining, MdOutlineFamilyRestroom, MdMoney} from 'react-icons/md'
import {LuVegan, LuDessert} from 'react-icons/lu'
import { GiSteak, GiHealthPotion, GiLovers, GiNoodles,GiCook } from "react-icons/gi"
import { FaBusinessTime, FaBirthdayCake } from "react-icons/fa"
import { FaMapLocationDot,FaMoneyCheckDollar } from "react-icons/fa6";

import { CiLocationOn } from "react-icons/ci";
import { FaStore } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";


export default function Bistro(){
	const {bistro} = usePage().props;
	const {auth} = usePage().props;
	const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(false);
    const checkedPaymentOptions = bistro.payment_options.filter(option=> option.checked == 1);
    const {
	        data,
	        setData,
	        delete: destroy,
	        processing,
	        reset,
	        clearErrors,
	        progress
	    } = useForm({
	        id:"",
	});
	console.log(bistro)
    const handleClickShowModal = (e)=>{
        setIsModalOpen(true);
        status = e.currentTarget.id;
        setModalContent(status);
        document.body.style.overflow = "hidden";
    }
    const handleClickHideModal = ()=>{
        setIsModalOpen(false);
        document.body.style.overflow = "auto";
    }
	return(
		<GuestLayout>
			<Head title={bistro.name} />
	        <div className='bistro others'>
	            <h1 className='title'> {bistro.name} </h1>
	            <p className="bistro_location">
	            	<CiLocationOn />
	            	{KigaliInformation["districts"][KigaliInformation["provinces"][bistro.province].toLowerCase()][bistro.district]}, 
	            	{KigaliInformation["provinces"][bistro.province]}
	            </p>
	            {(auth.user && auth.user.admin) &&(
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
				)}
	            <div className="kv">
	            	<div className="kv_main">
	            		<img src={bistro.kvs_images["kv1"]} alt="" className="kv_main_image"/>
	            	</div>
	            	<div className="kv_sub">
	            					<div className="kv_sub_item">
					            		<img src={bistro.kvs_images["kv2"]} alt="" className="kv_sub_item_image"/>
					            	</div>
					            	<div className="kv_sub_item">
					            		<img src={bistro.kvs_images["kv3"]} alt="" className="kv_sub_item_image"/>
					            	</div>
					            	<div className="kv_sub_item">
					            		<img src={bistro.kvs_images["kv4"]} alt="" className="kv_sub_item_image"/>
					            	</div>
					            	<div className="kv_sub_item">
					            		<img src={bistro.kvs_images["kv5"]} alt="" className="kv_sub_item_image"/>
					            	</div>
	            	</div>
	            </div>

	            <div className="description">
	            	{bistro.description}
	            </div>
	            {bistro.points &&
	            <section className="section images">
	            	<h2 className="section_title">The Best of {bistro.name}</h2>
	            	<div className="images_flex">
	            		
	            	        <Swiper
								effect={'coverflow'}
						        grabCursor={true}
						        centeredSlides={true}
						        slidesPerView={1.5}
						        coverflowEffect={{
						          rotate: 50,
						          stretch: 0,
						          depth: 100,
						          modifier: 1,
						          slideShadows: true,
						        }}
						        pagination={true}
						        modules={[EffectCoverflow, Pagination]}
						        className="mySwiper images_flex_item"
					        >
					        {bistro.points && bistro.points.map((point,i)=>(
					        	<SwiperSlide key={i}>       
					              	<img src={point["image"]} alt="" className="images_flex_item_image"/>
					              	<p className="points_remarks">{point["remarks"]}</p>
					             </SwiperSlide>
					        ))}
					        </Swiper>
				
					
					        <Swiper
								effect={'cube'}
						        grabCursor={true}
						        cubeEffect={{
						          shadow: true,
						          slideShadows: true,
						          shadowOffset: 20,
						          shadowScale: 0.94,
						        }}
						        pagination={true}
						        modules={[EffectCube, Pagination]}
						        className="mySwiper images_flex_item"
					        >
					        {bistro.menu_images && bistro.menu_images.map((menu_image,i)=>(
								<SwiperSlide key={i}>    
		            				<img src={menu_image.image} alt="" className="images_flex_item_image" />
		            			</SwiperSlide>
		   
		            		))}
					        </Swiper>
					       
					</div>
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
		            			<dt>Opening Hour</dt>
		            			<dd>{bistro.opening_hour}</dd>
		            			<dt>Average Cost</dt>
		            			<dd>{(bistro.min_price+bistro.max_price)/2} RWF</dd>
		            			<dt>Number of the seats</dt>
		            			<dd>{bistro.seats_number}</dd>
		            			<dt>Payment Options</dt>
		            			<dd>
		            				{bistro && checkedPaymentOptions.map((seenOptions,i)=>(
		            							<>
		            								{seenOptions["method"]}
		            								{(checkedPaymentOptions.length !== (i+1))&& ", "}
		            							</>
		            						))


		            				}
		            			</dd>
		            			<dt>Reservation</dt>
		            			<dd>{Reservation[bistro.reservation]}</dd>
		            			<dt>Dietary Restriction</dt>
		            			<dd>{Dietary_restrictions[bistro.dietary_restriction]}</dd>

		            		</dl>
		            	</div>
		            	<div className="information_googlemap col">
		            		<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15951.42618262729!2d30.397477329703413!3d-1.7968152709866068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19db693e8fbe8435%3A0x501efe6a2f38cf76!2z44Or44Ov44Oz44OAIOOCreODqeODn-ODpeODq-ODg-ODgQ!5e0!3m2!1sja!2sus!4v1733662568201!5m2!1sja!2sus" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
		            		<dl>
		            			<dt>Address</dt>
		            			<dd>{bistro.address}</dd>
		            			<dt>Contact</dt>
		            			<dd>
		            				{bistro.mobile &&
		            				<a href={`tel:${bistro.mobile}`}>{bistro.mobile}</a>
		            				} <br />
		            				{bistro.email &&
		            				<a href={`mailto:${bistro.email}`}>{bistro.email}</a>
		            				}
		            			</dd>
		            		</dl>
		            	</div>
	            	</div>
	            </section>
	            <section className="section">
	            	<h2 className="section_title">Perfect for...</h2>
	            	<div className="bestfor">
	            		<div className="bestfor_item">
	      					<StyleIcon bistrostyle={bistro.style} />
	            		</div>
	            		<div className="bestfor_item">
	      					<SpecialityIcon bistroSpeciality={bistro.speciality} />
	            		</div>
	            		<div className="bestfor_item">
	      					<OccasionIcon bistroOccasion={bistro.occasion} />
	            		</div>
	            	</div>
	            </section>
	            
	            <section className="section">
	            	<h2 className="section_title">Reviews</h2>
	            	<div className="rates">
	            		<div className="rates_all rates_item">
	            			<h3>Overall</h3>
		            		<div className="rates_all_item">
		            			<p className="rates_all_item_number">5</p>
		            			<progress className="rates_all_item_ingicator" id="file" max="100" value="70">70%</progress>
		            		</div>
		            		<div className="rates_all_item">
		            			<p className="rates_all_item_number">4</p>
		            			<progress className="rates_all_item_ingicator" id="file" max="100" value="40">70%</progress>
		            		</div>
		            		<div className="rates_all_item">
		            			<p className="rates_all_item_number">3</p>
		            			<progress className="rates_all_item_ingicator" id="file" max="100" value="20">70%</progress>
		            		</div>
		            		<div className="rates_all_item">
		            			<p className="rates_all_item_number">2</p>
		            			<progress className="rates_all_item_ingicator" id="file" max="100" value="20">70%</progress>
		            		</div>
		            		<div className="rates_all_item">
		            			<p className="rates_all_item_number">1</p>
		            			<progress className="rates_all_item_ingicator" id="file" max="100" value="0">70%</progress>
		            		</div>
	            			
	            		</div>
	            		<div className="rates_food rates_item">
	            			<p className="rates_item_title">Food</p>
	            			<p className="rates_item_number">5.0</p>
	            			<div className="rates_item_icon">
	            				<IoIosRestaurant />
	            			</div>
	            		</div>
	            		<div className="rates_service rates_item">
	            			<p className="rates_item_title">Service</p>
	            			<p className="rates_item_number">4.8</p>
	            			<div className="rates_item_icon">
	            				<IoIosRestaurant />
	            			</div>
	            		</div>
	            		<div className="rates_ambience rates_item">
	            			<p className="rates_item_title">Ambience</p>
	            			<p className="rates_item_number">4.0</p>
	            			<div className="rates_item_icon">
	            				<FaStore />
	            			</div>
	            		</div>
	            		<div className="rates_uniqueness rates_item">
	            			<p className="rates_item_title">Uniquness</p>
	            			<p className="rates_item_number">5.0</p>
	            			<div className="rates_item_icon">
	            				<IoIosRestaurant />
	            			</div>
	            		</div>
	            		<div className="rates_convenience rates_item">
	            			<p className="rates_item_title">Convenience</p>
	            			<p className="rates_item_number">3.0</p>
	            			<div className="rates_item_icon">
	            				<FaMapLocationDot />
	            			</div>
	            		</div>
	            		<div className="rates_value rates_item">
	            			<p className="rates_item_title">Value</p>
	            			<p className="rates_item_number">4.0</p>
	            			<div className="rates_item_icon">
	            				<FaMoneyCheckDollar />
	            			</div>
	            		</div>
	            	</div>
	            	<div className="reviews">
	            	<Modal isModalOpen={isModalOpen} handleClickHideModal={handleClickHideModal} 
                       modalContent={modalContent} />
	            		<div className="reviews_item">
		            		<div className="reviews_item_profile">
		            			<div className="reviews_item_profile_icon"><CgProfile /></div>
		            			<div className="reviews_item_profile_desc">
		            				<h3>Miki Togasawa</h3>
		            				<p>Aomori, Japan</p>
		            			</div>

		            		</div>
		            		<div className="reviews_item_desc">
		            			<div className="reviews_item_desc_star">★★★★</div>
		            			<div className="reviews_item_desc_date">December 2024</div>
		            		</div>
		            		<div className="reviews_item_comment">
		            			<p>
		            			Had such a wonderful stay here, would certainly highly recommend! 
		            			The location is wonderfully secluded but within walking distance of the (tiny) 
		            			village, comfortable temperatures despite the time of year, and a fully 
		            			equipped house with all necessities and more. Communication and instructions 
		            			were excellent. Thank you for the lovely stay!
								</p>
		            		</div>
		            		<div className="reviews_item_more">
		            		<button onClick={(e,id)=>handleClickShowModal(e,id)} id="review-detail">
		            			Show more 
		            		</button>
		            		</div>
	            		</div>
	            		<div className="reviews_item">
		            		<div className="reviews_item_profile">
		            			<div className="reviews_item_profile_icon"><CgProfile /></div>
		            			<div className="reviews_item_profile_desc">
		            				<h3>Miki Togasawa</h3>
		            				<p>Aomori, Japan</p>
		            			</div>

		            		</div>
		            		<div className="reviews_item_desc">
		            			<div className="reviews_item_desc_star">★★★★</div>
		            			<div className="reviews_item_desc_date">December 2024</div>
		            		</div>
		            		<div className="reviews_item_comment">
		            			<p>
		            			Had such a wonderful stay here, would certainly highly recommend! 
		            			The location is wonderfully secluded but within walking distance of the (tiny) 
		            			village, comfortable temperatures despite the time of year, and a fully 
		            			equipped house with all necessities and more. Communication and instructions 
		            			were excellent. Thank you for the lovely stay!
								</p>
		            		</div>
		            		<div className="reviews_item_more">
		            		<button onClick={(e,id)=>handleClickShowModal(e,id)} id="review-detail">
		            			Show more 
		            		</button>
		            		</div>
	            		</div>
	            	</div>
	            </section>
	        </div>
		</GuestLayout>
		)
}

const ReviewDetail = (e,id)=>{
	return(
		<div className="reviews_item detail">
    		<div className="reviews_item_profile">
    			<div className="reviews_item_profile_icon"><CgProfile /></div>
    			<div className="reviews_item_profile_desc">
    				<h3>Junichi Sunada</h3>
    				<p>Tokyo, Japan</p>
    			</div>

    		</div>
    		<div className="reviews_item_desc">
    			<div className="reviews_item_desc_star">★★★★</div>
    			<div className="reviews_item_desc_date">September 2024</div>
    		</div>
    		<div className="reviews_item_comment detail">
    			<p>An amazing place, In the heart of nature with a beautiful view of mountains and forest. The house is at the edge of a charming village. There are many wonderful hikes around the village. The house itself is equipped with everything you need to stay there. It is important to note that groceries must be bought at a distant supermarket before arriving.. (50 minutes away) In the village itself there is a small grocery store with few local products .
					Great communication and help on every issue.
					We will definitely come back!
				</p>
    		</div>
		</div>


		)
}

const AmbienceIcon = ()=>{

}


const StyleIcon = (bistrostyle)=>{
	switch(bistrostyle.bistrostyle){
	case 0:
		return(
			<>
				<div className="bestfor_item_icon">
					<IoFastFoodOutline />
				</div>
				<div className="bestfor_item_desc">
					<p>If you want fastfood</p>
				</div>
			</>
			)
		break;
	case 1:
		return(
			<>
				<div className="bestfor_item_icon">
					<MdOutlineDinnerDining />
				</div>
				<div className="bestfor_item_desc">
					<p>Casual</p>
				</div>
			</>
			)
		break;
	case 2:
		return(
			<>
				<div className="bestfor_item_icon">
					<IoRestaurantOutline />
				</div>
				<div className="bestfor_item_desc">
					<p>Nice Resutaurant</p>
				</div>
			</>
			)
		break;
	}
}
const SpecialityIcon = (bistroSpeciality)=>{
	switch(bistroSpeciality.bistroSpeciality){
		case 0:
		return(
			<>
				<div className="bestfor_item_icon">
					<LuVegan />
				</div>
				<div className="bestfor_item_desc">
					<p>If you are a vegan</p>
				</div>
			</>
			)
		break;
		case 1:
		return(
			<>
				<div className="bestfor_item_icon">
					<IoFishOutline />
				</div>
				<div className="bestfor_item_desc">
					<p>If you want seafood</p>
				</div>
			</>
			)
		break;
		case 2:
		return(
			<>
				<div className="bestfor_item_icon">
					<GiSteak />
				</div>
				<div className="bestfor_item_desc">
					<p>If you want steaks</p>
				</div>
			</>
			)
		break;
	case 3:
		return(
			<>
				<div className="bestfor_item_icon">
					<LuDessert />
				</div>
				<div className="bestfor_item_desc">
					<p>If you want desserts</p>
				</div>
			</>
			)
		break;
	}
}
const OccasionIcon = (bistroOccasion)=>{
	switch(bistroOccasion.bistroOccasion){
		case 0:
		return(
			<>
				<div className="bestfor_item_icon">
					<GiNoodles />
				</div>
				<div className="bestfor_item_desc">
					<p>On a casual time</p>
				</div>
			</>
			)
		break;
		case 1:
		return(
			<>
				<div className="bestfor_item_icon">
					<MdOutlineFamilyRestroom />
				</div>
				<div className="bestfor_item_desc">
					<p>On a family</p>
				</div>
			</>
			)
		break;
		case 2:
		return(
			<>
				<div className="bestfor_item_icon">
					<FaBirthdayCake />
				</div>
				<div className="bestfor_item_desc">
					<p>On a special event</p>
				</div>
			</>
			)
		break;
	case 3:
		return(
			<>
				<div className="bestfor_item_icon">
					<FaBusinessTime />
				</div>
				<div className="bestfor_item_desc">
					<p>On an business meething</p>
				</div>
			</>
			)
		break;
	}
}

export {ReviewDetail};