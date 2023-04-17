import styles from './../styles/location_modal.css';

function ModalBasic({ setModalOpen, id, title, content, writer ,handleLocationAdd}) {
    // 모달 끄기 
    const closeModal = () => {
        setModalOpen(false);
    };
    
    function fn_locationbtn() {
        handleLocationAdd('location'+id);
        closeModal();
    }
    
    return (
        <div className="containermodal">
            <button className="close" onClick={closeModal}>
                X
            </button>
            <div className='modal_top'></div>
            <div className='modal_center'></div>
            <div className='modal_bottom'>
                <button className='locationbtn' onClick={fn_locationbtn} >위치추가</button>
            </div>
        </div>
    );
}
export default ModalBasic;