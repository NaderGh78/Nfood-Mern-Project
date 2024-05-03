import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import AdminCategoryForm from './AdminCategoryForm';

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminCatModal = ({ show, onShowModal, onHideModal }) => {

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
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AdminCategoryForm />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AdminCatModal;