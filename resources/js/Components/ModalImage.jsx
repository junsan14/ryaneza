import { BistroMenu } from "@/Pages/Bistro/Bistro";
export default function ModalImage({modalContent,setModalContent,isModalOpen, setIsModalOpen,handleClickHideModal, ...props}){
const Content = ()=>{
    switch(modalContent){
        case "bistro-menu":
            return <BistroMenu handleClickHideModal={handleClickHideModal} />
            break;
       
    }
}


    return (
        <div className="modal-image"> 
            <div className={`modal_mask ${isModalOpen&&"show"}`} onClick={handleClickHideModal}></div>
            <div className={`wrap modal_area ${isModalOpen&&"show"} ${modalContent === "review-detail"&&"large"}`}>
                <div className="modal_area_toggle" onClick={handleClickHideModal}></div>
                <section className='modal_area_content'>
                    <Content />
                </section>
            </div> 
        </div>
    );
}
