import { DangerButton } from '@/Components/Button';
import Modal from '@/Components/Modal';

export default function DeleteUserForm({isModalOpen,modalContent,handleClickShowModal, handleClickHideModal}) {

    return (
        <>
                <h2 className="section_title">
                    Delete Account
                </h2>

                <p className="process_content_section_text">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
  
                <DangerButton onClick={handleClickShowModal} id="confirm-user-deletion">
                    Delete Account
                </DangerButton>
                <Modal isModalOpen={isModalOpen} handleClickHideModal={handleClickHideModal} 
                       modalContent={modalContent}  />
          
        </>
    );
}
