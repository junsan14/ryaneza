

export default function Accordion({modalContent,setModalContent,isModalShow, setIsModalShow,handleClickHideModal}){
//console.log(modalContent)

const Content = ()=>{
    switch(modalContent){

       
    }
}


    return (
        <div className="modal"> 
            <div className={`modal_mask  ${isModalShow?"show":""}`} onClick={handleClickHideModal}></div>
            <div className={`wrap modal_area  ${isModalShow?"show":""}`}>
                <div className="modal_area_toggle" onClick={handleClickHideModal}></div>
                <section className='modal_area_content'>
                    <Content />
                </section>
            </div> 
        </div>
    );
}
