import styles from './../styles/location_modal.css';

function ModalBasic({ setModalOpen, id, title, content, writer }) {
    // 모달 끄기 
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="container">
            <button className="close" onClick={closeModal}>
                X
            </button>
        </div>
    );
}
export default ModalBasic;