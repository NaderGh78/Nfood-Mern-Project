import { FaBurger } from "react-icons/fa6";
import { FaPizzaSlice, FaCoffee } from "react-icons/fa";
import { LuSalad, LuDessert } from "react-icons/lu";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const MenuFilterSidebar = ({ showAll, selectedCategory, filterItems, getCatLength, item }) => {

    return (
        <div className="menu-filter-sidebar">
            <div className="menu-filter-sidebar-categories categories-style">
                <h3 style={{ color: "var(--dark)" }}>Categories</h3>
                <ul>
                    <li
                        onClick={showAll}
                        className={selectedCategory === "all" ? "active" : ""}
                    >
                        <span><FaBurger />All</span><span>({item.length})</span>
                    </li>

                    <li
                        onClick={() => filterItems("pizza")}
                        className={selectedCategory === "pizza" ? "active" : ""}
                    >
                        <span><FaPizzaSlice />Pizza</span><span>({getCatLength("pizza")})</span>
                    </li>

                    <li
                        onClick={() => filterItems("salad")}
                        className={selectedCategory === "salad" ? "active" : ""}
                    >
                        <span><LuSalad />Salad</span><span>({getCatLength("salad")})</span>
                    </li>

                    <li
                        onClick={() => filterItems("burger")}
                        className={selectedCategory === "burger" ? "active" : ""}
                    >
                        <span><FaBurger />Burger</span><span>({getCatLength("burger")})</span>
                    </li>

                    <li
                        onClick={() => filterItems("desserts")}
                        className={selectedCategory === "desserts" ? "active" : ""}
                    >
                        <span><LuDessert />Desserts</span><span>({getCatLength("desserts")})</span>
                    </li>

                    <li
                        onClick={() => filterItems("drinks")}
                        className={selectedCategory === "drinks" ? "active" : ""}
                    >
                        <span><FaCoffee />Drinks</span><span>({getCatLength("drinks")})</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MenuFilterSidebar;