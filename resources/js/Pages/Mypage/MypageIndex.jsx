import { Head, usePage, Link } from '@inertiajs/react';
import Layout, { ShowModal } from '@/Layouts/Layout';
import KigaliInformation from '../Admin/Shared/BistroForm/KigaliInfomation';
import { FaStar } from 'react-icons/fa';
import { CiEdit } from "react-icons/ci";
import { authPermission, GorillaIcon, numberWithCommas, roundToTwo } from '@/script';
import { useContext } from 'react';
import { calculateAge } from '@/script';

export default function MypageIndex({auth}) {
    const {user} = usePage().props;
    const {bistros} = usePage().props;
    const {bistro_reviews} = usePage().props;
    const {averageRates} = usePage().props;
    //console.log(bistros,bistro_reviews)
    return (
        <>
            <Layout>
                <div className="mypage others">
                    <h1 className="main_title">Mypage</h1>
                    <div className="mypage_content">
                        <section className='section'>
                            <h2 className='section_title'>Your wishlist</h2>
                            <div className='mypage_content_wishlist bistros'>
                                <Wishlist bistros={bistros} averageRates={averageRates}/>
                            </div>
                        </section>
                        <section className='section'>
                            <h2 className='section_title'>Profile Card</h2>
                            {(authPermission(user)) ? 
                            <div className="mypage_content_profile">
                                <div className='mypage_content_profile_icon'>
                                    {String(user.icon).indexOf("#") !== 0 
                                    ?<img src={user.icon} alt="" />
                                    :<GorillaIcon color_code={user.icon} />
                                    }
                                </div>
                                <div className='mypage_content_profile_content'>
                                    <h2 className='mypage_content_profile_content_username'>{user.username}</h2>
                                    <p className='mypage_content_profile_content_intro'>
                                        {user.intro}
                                    </p>
                                    <div className='mypage_content_profile_content_remarks'>
                                        {calculateAge(user.birth_year)},  {user.type},  from {user.country}        
                                    </div>
                                </div>
                            
                            </div>
                            :<>You have not finshed creating your profile information.</>}      
                        </section>
                        <section className='section'>
                            <h2 className='section_title'>Your Comment histroy</h2>  
                            <div className='mypage_content_comments'>
                                <MyReviews bistro_reviews={bistro_reviews} />    
                            </div>
                        </section>
                    </div>
                </div>
            </Layout>
        </>
    );
}

const Wishlist = ({bistros, averageRates})=>{
    if(bistros.length !== 0){
        return(
            bistros && bistros.map((bistro,i)=>(
                <div className="bistros_item">
                    <Link href="/bistro" data={{ id: bistro.id, name: bistro.name }} className="bistros_item_content" key={i}>
                        <img src={bistro.thumbnail_image && bistro.thumbnail_image[0]["src"]} alt="" className="bistros_item_content_thumbnail" />
                        <h3 className="bistros_item_content_title">{bistro.name}</h3>
                        <p className="bistros_item_content_location">{KigaliInformation["districts"][KigaliInformation["provinces"][bistro.province].toLowerCase()][bistro.district]}, {KigaliInformation["provinces"][bistro.province]}</p>
                        <div className="bistros_item_content_remarks">
                            <p className="bistros_item_content_remarks_price">
                                {numberWithCommas((bistro.min_price + bistro.max_price)/2)} RWF
                            </p>
                            <div className="bistros_item_content_remarks_star">
                                <FaStar /> <span>
                                    {roundToTwo(averageRates[bistro.id])}
                                </span>
                            </div>
                        </div>
                    </Link>
    
                </div>
            ))
        )
    }else{
        return(
            <>There is no yoru wishlist</>
        )
    }

}


const MyReviews = ({bistro_reviews})=>{
   const {handleClickShowModal} = useContext(ShowModal);
   if(bistro_reviews.length !== 0){
    return(
        bistro_reviews.map((bistro_review,i)=>(
            <div className='mypage_content_comments_item'>
                <div className='mypage_content_comments_item_flex'>
                    <h3 className='mypage_content_comments_item_flex_name'>{bistro_review.name}</h3>
                    <button className='mypage_content_comments_item_flex_edit' 
                        id="edit-review" onClick={(e,content={bistro_review})=>handleClickShowModal(e,content)}>
                        <CiEdit />
                    </button>
                </div>
                <span className='mypage_content_comments_item_location'>
                    {KigaliInformation["districts"][KigaliInformation["provinces"][bistro_review.province].toLowerCase()][bistro_review.district]},
                    {KigaliInformation["provinces"][bistro_review.province]},
                </span>

                <div className='mypage_content_comments_item_comment'>
                    <p>
                       {bistro_review.comment}
                    </p>
                </div>
                <div className='mypage_content_comments_item_date'>
                    {bistro_review.visited_date}
                </div>
            </div>
        ))
    )
   }else{
    return(
        <>There is no comments</>
    )
   }
    
}



                        