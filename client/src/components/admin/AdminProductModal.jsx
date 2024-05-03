import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import AdminProductForm from './AdminProductForm';

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminProductModal = ({ show, onShowModal, onHideModal }) => {

    const dispatch = useDispatch();

    /*======================================*/

    return (
        <div className="my-modal">
            <Modal
                show={show}
                onHide={() => { dispatch(onShowModal()) }}
                className="custom-modal"
            >
                <Modal.Header closeButton onClick={() => { dispatch(onHideModal()) }}>
                    <Modal.Title>Add New Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AdminProductForm />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AdminProductModal;