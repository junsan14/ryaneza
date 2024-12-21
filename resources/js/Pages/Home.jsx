
import Footer from "@/Shared/Footer";
import { IoSearchCircle,IoSearch } from "react-icons/io5";
import Layout from "@/Layouts/Layout";
import { FaStar } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import $ from 'jquery';
import { usePage, Link, router, useForm } from "@inertiajs/react";
import KigaliInformation from "./Admin/Shared/BistroForm/KigaliInfomation";
import { BistroGenres } from "./Admin/Shared/BistroForm/Categories";

import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import Bistro from "./Bistro/Bistro";
import { FaRegHeart,FaHeart } from "react-icons/fa6";
import { numberWithCommas,roundToTwo } from "@/script";

export default function Home(){
	const {bistros} = usePage().props;
	const [selectedBistros, setSelectedBistros] = useState(bistros);
	const {auth} = usePage().props;
	const {averageRates} = usePage().props;
	let wishlist = auth.user && auth.user.wishlist  ? auth.user.wishlist :[];

	/*
	$(window).on("scroll", function(){
	let $searchForm = $('.js-search-form')
	if($searchForm){
		let $searchForm_positionY = $searchForm.offset().top;
		let current_positionY = $(window).scrollTop();
		//console.log($searchForm_positionY)
		if(current_positionY>$searchForm_positionY){
			//console.log($searchForm.children("div").children("input"));
			$searchForm.addClass("scroll-fix");
			$searchForm.children("div").children("input").addClass("hide");
		}else if(current_positionY < 60){
			$searchForm.removeClass("scroll-fix");
			$searchForm.children("div").children("input").removeClass("hide");
		}
	}

	})
	*/
	const {data,setData,delete: destroy,post ,reset,} = useForm({});
    useEffect(()=>{
    	setSelectedBistros(bistros);
    },[bistros])
	const handleClickDelete = (e,id,name)=>{
		e.preventDefault();
		destroy(route('bistro.destroy',{id:id, name:name}),{
			onBefore: () => {
					const res = confirm('Do you really want to delete?');
					if(!res){
						//$(e.currentTarget).parent().prop('disabled', false);
						//$(e.currentTarget).css('cursor', "pointer");
					}
					return res;
				},
			onFinish: () => reset(),
			preserveScroll:true
		});
	}
	const handleClickLike = (e,id)=>{
		e.preventDefault();
		//setData("wishlist",[...data.wishlist ,id]);
		wishlist.push(id);
		console.log(wishlist)
		
		post(route('profile.wishlist.update', {wishlist:wishlist}),{
			preserveScroll:true,
		})
		
	}
	const handleClickUnLike = (e,id)=>{
		e.preventDefault();
		//setData("wishlist",[id]);
		wishlist = wishlist.filter((ele,i)=> ele != id);
		console.log(wishlist)
	
		post(route('profile.wishlist.update', {wishlist:wishlist}),{
			preserveScroll:true,
		})
	
	}
     //console.log(bistros)
	return(
		<Layout>
			<SearchForm bistros={bistros} setSelectedBistros={setSelectedBistros} />
			<div className="home">
			


				<section className="section pickup">
					<h2 className="section_title">PICK UP</h2>
					<div className="bistros">
					{selectedBistros &&selectedBistros.map((bistro,i)=>(
						<div className="bistros_item" key={i}>
							{(auth.user && auth.user.admin) ?(
								<>
									<button className="bistros_item_delete">
										<Link onClick={(e,id=bistro.id,name=bistro.name)=>handleClickDelete(e,id,name)} >
											<MdOutlineDelete />
										</Link>

									</button>
									<button className="bistros_item_edit">
										<Link href="/edit-bistro" data={{id:bistro.id}} >
											<CiEdit />
										</Link>
									</button>
								</>
							):<></>}
							{(auth.user && auth.user.wishlist  && auth.user.wishlist.find(ele=>ele == bistro.id) )?
							<div className="bistros_item_like">
								<button onClick={(e,id=bistro.id)=>handleClickUnLike(e,id)}>
									<FaHeart />
								</button>
							</div>
							:
							<div className="bistros_item_like">
								<button onClick={(e,id=bistro.id)=>handleClickLike(e,id)}>
									<FaRegHeart />
								</button>
							</div>
							
							}
							<Link href="/bistro" data={{ id: bistro.id, name: bistro.name }} className="bistros_item_content" key={i}>		
								<img src={bistro.thumbnail_image&&bistro.thumbnail_image[0]["src"]} alt="" className="bistros_item_content_thumbnail" />
								<h3 className="bistros_item_content_title">{bistro.name}</h3>
								<p className="bistros_item_content_location">{KigaliInformation["districts"][KigaliInformation["provinces"][bistro.province].toLowerCase()][bistro.district]}, {KigaliInformation["provinces"][bistro.province]}</p>
								<div className="bistros_item_content_remarks">
									<p className="bistros_item_content_remarks_price">
										{numberWithCommas((bistro.min_price + bistro.max_price)/2)} RWF
									</p>
									<div className="bistros_item_content_remarks_star">
									{averageRates[bistro.id] ? 
										<>
											<FaStar /> 
											<span>
												{averageRates[bistro.id] ? roundToTwo(averageRates[bistro.id]):"N"}
											</span>
										</>
									:<>
									New!
									</>}
										
									</div>
								</div>
							</Link>

						</div>
						))}
						
					</div>

				</section>
			</div>

			<Footer />
		</Layout>
		)
}


function SearchForm({bistros, setSelectedBistros}){  
	
	const [searchWords, setSearchWords] = useState({
		keyword:"",
		destination:"",
		genre:null,
		})
    const handleChangeSearch = (e)=>{
        const inputKeyword = e.target.value;
        const key= e.target.id;
        let matchBistros = bistros;
        setSearchWords({
        	...searchWords,
        	[key]:inputKeyword
        })
        searchWords[key] = inputKeyword
        console.log(searchWords)
        const keywordReg = new RegExp(searchWords.keyword,"gi");
        const DestinationReg = new RegExp(searchWords.destination,"gi");
        if(searchWords.keyword){	
        	matchBistros = (matchBistros.filter((bistro) =>(
                  (String(bistro['keywords']).match(keywordReg) ||String(bistro['name']).match(keywordReg))
                )));
        }
        if(searchWords.genre && searchWords.genre !== "all"){	
        	matchBistros = (matchBistros.filter((bistro) =>(
                  (bistro.genre == searchWords.genre)
                )));
        }
        if(searchWords.destination){	
        	matchBistros = (matchBistros.filter((bistro) =>(
                  (
                  	String(KigaliInformation['provinces'][bistro.province]).match(DestinationReg) || 
                  	String(KigaliInformation['districts'][KigaliInformation['provinces'][bistro.province].toLowerCase()][bistro.district]).match(DestinationReg)
                  	) 
                )));
        }
  
       setSelectedBistros(matchBistros);
    }
    const handleClickReset = ()=>{
        $(".search_area_input").val("");
         setKeyword("");
         setCategory("");
         setSelectedPosts(posts);
         $(".js-search_area_icon").removeClass("fixed");
     }
	return(
		<>
		<form action="" className="search-form js-search-form">
			<div className="search-form_input-area">
				<label htmlFor="destination" className="search-form_input-area_label">Where</label>
				<input type="text" id="destination" className="search-form_input-area_box" 
					   placeholder="Search destinations" onChange={handleChangeSearch}/>
			</div>
			<div className="search-form_input-area">
				<label htmlFor="genre" className="search-form_input-area_label">What</label>
				
				<select onChange={handleChangeSearch} id="genre" className="search-form_input-area_select" >
							<option value="all">All</option>
					{BistroGenres.map((genre,i)=>(
							<option key={i} value={i}>{genre}</option>
						))}
				</select>	
			</div>
			<div className="search-form_input-area">
				<label htmlFor="keyword" className="search-form_input-area_label">Keywords</label>
				<input type="text" id="keyword" className="search-form_input-area_box" placeholder="Add keywords"
						onChange={handleChangeSearch}
				/>
			</div>
			<div className="search-form_btn-area">
				<IoSearchCircle />
			</div>
			<div className="search-form_text-area">
				<p>Anywhere, any genre, any keywords</p>
			</div>
		</form>

		</>
		)
}

