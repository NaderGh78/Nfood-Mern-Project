import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminProductDetailsModal = ({ show, onShowModal, onHideModal, product }) => {

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
                    <div className="card" style={{ width: "100%" }}>
                        <img
                            src={product?.image?.url}
                            className="card-img-top"
                            alt={product?.name}
                            style={{ width: "80%", height: "240px", objectFit: "contain", margin: "auto" }}
                        />
                        <div className="card-body">
                            <h5 className="card-title">{product?.name}</h5>
                            <p className="card-text">{product?.description}</p>
                            <p className="card-text">category : {product?.category}</p>
                            <p>
                                price :
                                {
                                    // in case the admin not put a new price that mean that the new price is null
                                    product?.newPrice !== null ?
                                        <>
                                            <span className="text-decoration-line-through text-secondary">${product?.price}</span>
                                            <span className="ms-2">${product?.newPrice}</span>
                                        </> :
                                        <>
                                            <span>${product?.price}</span>
                                        </>
                                }
                            </p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AdminProductDetailsModal;