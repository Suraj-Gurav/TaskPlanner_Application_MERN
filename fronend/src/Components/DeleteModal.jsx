import ReactModal from 'react-modal'
import deleteLottie from './../Assets/delete.json';
import Lottie from "lottie-react";


const DeleteModal = ({ isOpenModal ,setIsModalOpen, handleDelete}) => {
   const Loaderstyle = {
    width: "20%",
    margin: "0 auto"
  }
    return (
        <ReactModal
            isOpen={isOpenModal}
            contentLabel="Minimal Modal Example"
            className="LoaderModal"
            ariaHideApp={false}
            shouldCloseOnOverlayClick={false}
            style={{background:'rgb(108 105 105 / 75%)'}}
        >
            <div className='deleteModalWrapper'>
                <Lottie animationData={deleteLottie} style={Loaderstyle} />
                <h2>Are you sure you want to delete this task?</h2>
                <div className='modalButtonWrapper'>
                <button className='modalButtonStyle' onClick={handleDelete} style={{ marginRight: "10px" }}>Yes, Delete</button>
                <button className='modalButtonStyle' onClick={() => setIsModalOpen(false)}>Cancel</button>
                </div>
            </div>
        </ReactModal>
    )
}
export default DeleteModal