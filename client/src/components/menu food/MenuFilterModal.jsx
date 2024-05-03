import Modal from 'react-bootstrap/Modal';
import { FaXmark, FaBurger } from "react-icons/fa6";
import { FaPizzaSlice, FaCoffee } from "react-icons/fa";
import { LuSalad, LuDessert } from "react-icons/lu";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const MenuFilterModal = ({ showCatModal, closeCatModal, showAll, selectedCategory, filterItems, getCatLength, item }) => {
    return (
        <div>
            <Modal
                show={showCatModal}
                onHide={closeCatModal}
                className='cart-modal-Modal'
                backdrop="static"
            >
                <div className="top-heading-title d-flex align-items-center justify-content-between text-white p-3 bg-dark">
                    <h3 className='mb-0'>Categories</h3>
                    <span
                        onClick={() => closeCatModal()}
                    >
                        <FaXmark />
                    </span>
                </div>
                <Modal.Body>
                    <div className="categories-style">
                        <ul>
                            <li
                                onClick={() => { showAll(); closeCatModal() }}
                                className={selectedCategory === "all" ? "active" : ""}
                            >
                                <span><FaBurger />All</span><span>({item.length})</span>
                            </li>

                            <li
                                onClick={() => { filterItems("pizza"); closeCatModal() }}
                                className={selectedCategory === "pizza" ? "active" : ""}
                            >
                                <span><FaPizzaSlice />Pizza</span><span>({getCatLength("pizza")})</span>
                            </li>

                            <li
                                onClick={() => { filterItems("salad"); closeCatModal() }}
                                className={selectedCategory === "salad" ? "active" : ""}
                            >
                                <span><LuSalad />Salad</span><span>({getCatLength("salad")})</span>
                            </li>

                            <li
                                onClick={() => { filterItems("burger"); closeCatModal() }}
                                className={selectedCategory === "burger" ? "active" : ""}
                            >
                                <span><FaBurger />Burger</span><span>({getCatLength("burger")})</span>
                            </li>

                            <li
                                onClick={() => { filterItems("desserts"); closeCatModal() }}
                                className={selectedCategory === "desserts" ? "active" : ""}
                            >
                                <span><LuDessert />Desserts</span><span>({getCatLength("desserts")})</span>
                            </li>

                            <li
                                onClick={() => { filterItems("drinks"); closeCatModal() }}
                                className={selectedCategory === "drinks" ? "active" : ""}
                            >
                                <span><FaCoffee />Drinks</span><span>({getCatLength("drinks")})</span>
                            </li>
                        </ul>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default MenuFilterModal;