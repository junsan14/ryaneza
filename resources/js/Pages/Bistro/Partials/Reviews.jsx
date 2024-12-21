import { ShowModal } from "@/Layouts/Layout"
import { useContext } from "react"
import { PrimaryButton } from "@/Components/Button";
import { Occasions } from "@/Pages/Admin/Shared/BistroForm/Categories";


import { IoIosRestaurant } from "react-icons/io";
import { FaStore } from "react-icons/fa";
import { FaMapLocationDot,FaMoneyCheckDollar } from "react-icons/fa6";
import { GiSteak, GiHealthPotion, GiLovers, GiNoodles,GiCook } from "react-icons/gi"
import {MdOutlineBakeryDining, MdOutlineDinnerDining, MdOutlineFamilyRestroom, MdMoney} from 'react-icons/md'
import { FaStar,FaStarHalf,FaRegStar,FaStarHalfAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { usePage } from "@inertiajs/react";
import { calculateAge } from "@/script";
import { numberWithCommas,authPermission } from "@/script";
import { LocalityTypes } from "@/Pages/Admin/Shared/BistroForm/Categories";
import { GorillaIcon } from "@/script";

import waiter from '../../../../img/bistro/waiter.png'
import food from '../../../../img/bistro/food.png'
import ambience from '../../../../img/bistro/ambience.png'
import convenience from '../../../../img/bistro/convenience.png'
import value from '../../../../img/bistro/value.png'
import uniqueness from '../../../../img/bistro/uniquness.png'





function Reviews ({bistro_reviews}){
    const {auth} = usePage().props;
	const {handleClickShowModal, message, setisShowMsg, setMsgState} = useContext(ShowModal)
	const {is_email_verified} = auth;
	
	
    const  countRate = {
        overall:{
            1:0,
            2:0,
            3:0,
            4:0,
            5:0
        },
        "food":0,
        "service":0,
        "ambience":0,
        "uniqueness":0,
        "convenience":0,
        "value":0,
        "n":bistro_reviews.length
    }
    const overall_rates = []
    const calculateOverallRate = ()=>{
        bistro_reviews.map((review,i)=>{
            switch(review.overall_rate){
                case 1:
                    countRate["overall"]["1"] =countRate["overall"]["1"]+1;
                    break;
                case 2:
                    countRate["overall"]["2"] =countRate["overall"]["2"]+1;
                    break;
                case 3:
                    countRate["overall"]["3"] =countRate["overall"]["3"]+1;
                    break;  
                case 4:
                    countRate["overall"]["4"] =countRate["overall"]["4"]+1;
                    break;
                case 5:
                    countRate["overall"]["5"] =countRate["overall"]["5"]+1;
                    break;
            }
            countRate["food"] += review.food_rate;
            countRate["service"] += review.service_rate;
            countRate["ambience"] += review.ambience_rate;
            countRate["uniqueness"] += review.uniqueness_rate;
            countRate["convenience"] += review.convenience_rate;
            countRate["value"] += review.value_rate;

      
        })
    }
    calculateOverallRate()
	return(
		<section className="section">
			<h2 className="section_title">Reviews</h2>
			{bistro_reviews.length !== 0 ?(
				<div className="rates">
					<div className="rates_all rates_item">
						<h3>Overall</h3>
						<div className="rates_all_item">
							<p className="rates_all_item_number">5</p>
							<progress className={`rates_all_item_ingicator ${authPermission(auth.user)&& "remove-blur"}`} id="file" max={countRate["n"]} value={countRate["overall"]["5"]}></progress>
						</div>
						<div className="rates_all_item">
							<p className="rates_all_item_number">4</p>
							<progress className={`rates_all_item_ingicator ${authPermission(auth.user)&& "remove-blur"}`} id="file" max={countRate["n"]} value={countRate["overall"]["4"]}></progress>
						</div>
						<div className="rates_all_item">
							<p className="rates_all_item_number">3</p>
							<progress className={`rates_all_item_ingicator ${authPermission(auth.user)&& "remove-blur"}`} value={countRate["overall"]["3"]}></progress>
						</div>
						<div className="rates_all_item">
							<p className="rates_all_item_number">2</p>
							<progress className={`rates_all_item_ingicator ${authPermission(auth.user)&& "remove-blur"}`} value={countRate["overall"]["2"]}></progress>
						</div>
						<div className="rates_all_item">
							<p className="rates_all_item_number">1</p>
							<progress className={`rates_all_item_ingicator ${authPermission(auth.user)&& "remove-blur"}`} value={countRate["overall"]["1"]}></progress>
						</div>
						
					</div>
					<div className="rates_food rates_item">
						<p className="rates_item_title">Food</p>
						<p className={`rates_item_number ${authPermission(auth.user)&& "remove-blur" }`} >
							{Math.floor((countRate["food"]/ countRate["n"])*10)/10}
						</p>
						<div className="rates_item_icon">
						<img className="rates_item_icon_src" src={food} alt="" />
						</div>
					</div>
					<div className="rates_service rates_item">
						<p className="rates_item_title">Service</p>
						<p className={`rates_item_number ${authPermission(auth.user)&& "remove-blur" }`}>
							{Math.floor((countRate["service"]/ countRate["n"])*10)/10}
						</p>
						<div className="rates_item_icon">
							<img className="rates_item_icon_src" src={waiter} alt="" />
						</div>
					</div>
					<div className="rates_ambience rates_item">
						<p className="rates_item_title">Ambience</p>
						<p className={`rates_item_number ${authPermission(auth.user)&& "remove-blur" }`}>
							{Math.floor((countRate["ambience"]/ countRate["n"])*10)/10}
						</p>
						<div className="rates_item_icon">
							<div className="rates_item_icon">
								<img className="rates_item_icon_src" src={ambience} alt="" />
							</div>
						</div>
					</div>
					<div className="rates_uniqueness rates_item">
						<p className="rates_item_title">Uniquness</p>
						<p className={`rates_item_number ${authPermission(auth.user)&& "remove-blur" }`}>
							{Math.floor((countRate["uniqueness"]/ countRate["n"])*10)/10}
						</p>
						<div className="rates_item_icon">
							<div className="rates_item_icon">
								<img className="rates_item_icon_src" src={uniqueness} alt="" />
							</div>
						</div>
					</div>
					<div className="rates_convenience rates_item">
						<p className="rates_item_title">Convenience</p>
						<p className={`rates_item_number ${authPermission(auth.user)&& "remove-blur" }`}>
							{Math.floor((countRate["convenience"]/ countRate["n"])*10)/10}
						</p>
						<div className="rates_item_icon">
							<div className="rates_item_icon">
								<img className="rates_item_icon_src" src={convenience} alt="" />
							</div>
						</div>
					</div>
					<div className="rates_value rates_item">
						<p className="rates_item_title">Value</p>
						<p className={`rates_item_number ${authPermission(auth.user)&& "remove-blur" }`}>
							{Math.floor((countRate["value"]/ countRate["n"])*10)/10}
						</p>
						<div className="rates_item_icon">
							<div className="rates_item_icon">
								<img className="rates_item_icon_src" src={value} alt="" />
							</div>
						</div>
					</div>
				</div>
			):<>No reviews yet. </> }

			<div className={`create-review ${authPermission(auth.user)&& "remove-blur"}`}>
				{authPermission(auth.user) ? 
					bistro_reviews.find((ele,i)=>ele.id === auth.user.id)
					?<p>Thank you for your comment</p>
					:<PrimaryButton
						onClick={handleClickShowModal} id="create-review">
						Write a comment			
						</PrimaryButton>
				:
					<PrimaryButton onClick={()=>{
						auth.user ? setMsgState("Please finish up your profile"):
							   setMsgState("Please log in")
						setisShowMsg(true);
					}} id="not-allowed">
						Write a review
					</PrimaryButton>

				}
	
			</div>
			<div className="reviews">
				{bistro_reviews.map((bistro_review,i)=>(
					<div className="reviews_item" key={i}>
					<div className="reviews_item_profile">
						<div className="reviews_item_profile_icon">
							{String(bistro_review.icon).indexOf("#") !==0 
								?<img src={bistro_review.icon} alt="" />
								:<GorillaIcon color_code={bistro_review.icon} />		
							}		
						</div>
						<div className="reviews_item_profile_desc">
							<h3>{bistro_review.username}</h3>
							<p>{calculateAge(bistro_review.birth_year)}, {LocalityTypes[bistro_review.locality_type].toLowerCase()}, {bistro_review.country}</p>
						</div>
					</div>
					<div className="reviews_item_desc">
						<div className="reviews_item_desc_star">
							<Star rate={bistro_review.overall_rate} />
						</div>
						<div className="reviews_item_desc_date">
						{bistro_review.visited_date}
						</div>
					</div>
					<div className={`reviews_item_comment ${authPermission(auth.user)&& "remove-blur"} }`}>
						<p>
						{bistro_review.comment}
						</p>
					</div>
					<div className={`reviews_item_more ${authPermission(auth.user)&& "remove-blur"} }`}>
					<button onClick={(e,id=i)=>handleClickShowModal(e,id)} id="review-detail">
						Show more 
					</button>
					</div>
				</div>
				))}		
			</div>
		</section>


	)
}


function ReviewDetailModal(){
	const {modalContent} = useContext(ShowModal)
    const {bistro_reviews} = usePage().props;
	//console.log(bistro_reviews)
	return(
		<div className="review-detail">
            <div className="review-detail_flex">
                <div className="review-detail_flex_profile">
                    <div className="review-detail_flex_profile_icon">
                        {bistro_reviews[modalContent].icon && String(bistro_reviews[modalContent].icon).indexOf("#") !== 0
                            ? <img src={bistro_reviews[modalContent].icon} alt=""/>
                            : <GorillaIcon color_code={bistro_reviews[modalContent].icon} />
                        }
                    </div>
                    <div className="review-detail_flex_profile_desc">
                        <h3>{bistro_reviews[modalContent].username}</h3>
						<div className="review-detail_flex_profile_desc_tags">
							{bistro_reviews[modalContent].gender === "Other"
							?""
							:<span className="review-detail_flex_profile_desc_tags_item">{bistro_reviews[modalContent].gender}</span>
							}
							<span className="review-detail_flex_profile_desc_tags_item">{calculateAge(bistro_reviews[modalContent].birth_year)} </span>
							<span className="review-detail_flex_profile_desc_tags_item">{LocalityTypes[bistro_reviews[modalContent].locality_type]}</span>
							<span className="review-detail_flex_profile_desc_tags_item">{bistro_reviews[modalContent].country}</span>

						</div>
                    </div>
                </div>
                <div className="review-detail_flex_rates">
                    <dl className="review-detail_flex_rates_item">
                        <dt>Food</dt> 
                        <dd><Star rate={bistro_reviews[modalContent].food_rate} /></dd>
                    </dl>
                    <dl className="review-detail_flex_rates_item">
                        <dt>Service</dt> 
                        <dd><Star rate={bistro_reviews[modalContent].service_rate} /></dd>
                    </dl>
                    <dl className="review-detail_flex_rates_item">
                        <dt>Ambience</dt> 
                        <dd><Star rate={bistro_reviews[modalContent].ambience_rate} /></dd>
                    </dl>
                    <dl className="review-detail_flex_rates_item">
                        <dt>Value</dt> 
                        <dd><Star rate={bistro_reviews[modalContent].value_rate} /></dd>
                    </dl>
                    <dl className="review-detail_flex_rates_item">
                        <dt>Covenience</dt> 
                        <dd><Star rate={bistro_reviews[modalContent].convenience_rate} /></dd>
                    </dl>
                    <dl className="review-detail_flex_rates_item">
                        <dt>Uniqueness</dt> 
                        <dd><Star rate={bistro_reviews[modalContent].uniqueness_rate} /></dd>
                    </dl>
                    <dl className="review-detail_flex_rates_item">
                        <dt>Overall</dt> 
                        <dd><Star rate={bistro_reviews[modalContent].overall_rate} /></dd>
                    </dl>
                </div>
            </div>
    		<div className="review-detail_flex_comment">
    			<p>{bistro_reviews[modalContent].comment}</p>
    		</div>
            <div className="review-detail_flex_remarks">
				<div className="review-detail_flex_remarks_tags">
					<span className="review-detail_flex_remarks_tags_item">{Occasions[bistro_reviews[modalContent].situation]}</span>
					{bistro_reviews[modalContent].situation == 0 || bistro_reviews[modalContent].situation == 1 
					?""
					:<span className="review-detail_flex_remarks_tags_item">
						{bistro_reviews[modalContent].howmany} people 
					</span>
				}
					
					<span className="review-detail_flex_remarks_tags_item">{numberWithCommas(bistro_reviews[modalContent].cost)} RWF</span>
				</div>
    			<div className="review-detail_flex_remarks_date">Visited on {bistro_reviews[modalContent].visited_date}</div>
    		</div>
		</div>
		)
}

const Star = ({rate})=>{
	switch(rate){
		case 5:
			return (
				<>
					<FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
				</>

		)
		case 4.5:
			return (
				<>
					<FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
				</>
		)
		case 4:
			return (
				<>
					<FaStar /><FaStar /><FaStar /><FaStar /><FaRegStar />
				</>
		)
		case 3.5:
			return (
				<>
					<FaStar /><FaStar /><FaStar /><FaStarHalfAlt /><FaRegStar />
				</>
		)
		case 3:
			return (
				<>
					<FaStar /><FaStar /><FaStar /><FaRegStar /><FaRegStar />
				</>
		)
		case 2.5:
			return (
				<>
					<FaStar /><FaStar /><FaStarHalfAlt /><FaRegStar /><FaRegStar />
				</>
		)
		case 2:
			return (
				<>
					<FaStar /><FaStar /><FaRegStar /><FaRegStar /><FaRegStar />
				</>
		)
		case 1.5:
			return (
				<>
					<FaStar /><FaStarHalfAlt /><FaRegStar /><FaRegStar /><FaRegStar />
				</>
		)
		case 1:
			return (
				<>
					<FaStar /><FaRegStar /><FaRegStar /><FaRegStar /><FaRegStar />
				</>
		)
		case 0.5:
			return (
				<>
					<FaStarHalfAlt /><FaRegStar /><FaRegStar /><FaRegStar /><FaRegStar />
				</>
		)

	
	}
}
export {Reviews, ReviewDetailModal}