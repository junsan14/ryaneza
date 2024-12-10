
import Footer from "@/Shared/Footer";
import { IoSearchCircle,IoSearch } from "react-icons/io5";
import Layout from "@/Layouts/Layout";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import $ from 'jquery';
import { usePage, Link, router, useForm } from "@inertiajs/react";
import KigaliInformation from "./Admin/Shared/BistroForm/KigaliInfomation";
import { BistroGenres } from "./Admin/Shared/BistroForm/Categories";

import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import Bistro from "./Bistro/Bistro";


export default function Home(){
	const {bistros} = usePage().props;
	const [selectedBistros, setSelectedBistros] = useState(bistros);
	const {auth} = usePage().props;
	console.log(bistros);
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
    useEffect(()=>{
    	setSelectedBistros(bistros);
    },[bistros])
const handleClickDelete = (e)=>{
        let id = Number(e.currentTarget.id);
        e.preventDefault();
        //$(e.currentTarget).parent().prop('disabled', true);
        //$(e.currentTarget).css('cursor', "not-allowed");
        //setEditInfo([id, "", "delete"]);
        destroy(route('bistro.destroy',{id:id}),{
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
	return(
		<Layout>
			<SearchForm bistros={bistros} setSelectedBistros={setSelectedBistros} />
			<div className="home">
				<section className="section pickup">
					<h2 className="section_title">PICK UP</h2>
					<div className="bistros">
					{selectedBistros &&selectedBistros.map((bistro,i)=>(
						<div className="bistros_item">
							{(auth.user && auth.user.admin) &&(
								<>
									<button className="bistros_item_delete">
										<Link id={bistro.id} onClick={(e)=>handleClickDelete(e)} >
											<MdOutlineDelete />
										</Link>
									</button>
									<button className="bistros_item_edit">
										<Link href="/edit-bistro" data={{id:bistro.id}} >
											<CiEdit />
										</Link>
									</button>
								</>
							)}
							<Link href="/bistro" data={{ id: bistro.id, name: bistro.name }} className="bistros_item_content" key={i}>
								<img src={bistro.thumbnail} alt="" className="bistros_item_content_thumbnail" />
								<h3 className="bistros_item_content_title">{bistro.name}</h3>
								<p className="bistros_item_content_location">{KigaliInformation["districts"][KigaliInformation["provinces"][bistro.province].toLowerCase()][bistro.district]}, {KigaliInformation["provinces"][bistro.province]}</p>
								<div className="bistros_item_content_remarks">
									<p className="bistros_item_content_remarks_price">
										{(bistro.min_price + bistro.max_price)/2} RWF
									</p>
									<div className="bistros_item_content_remarks_star">
										<FaStar /> <span>4.5</span>
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
							<option value={i}>{genre}</option>
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

