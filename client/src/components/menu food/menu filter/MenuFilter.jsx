import "./menuFilter.css";
import { FaList, FaGrip, FaFilter } from "react-icons/fa6";
import { MenuFilterSidebar, SingleCard, SingleCardListView } from "../../../allPagesPaths";
import Spinner from "../../common/spinner/Spinner";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const MenuFilter = ({
    loading,
    allItems,
    view,
    changeToLIstViewHandler,
    changeToGridViewHandler,
    spanRef,
    filterItems,
    selectedCategory,
    showAll,
    handleSortChange,
    sortOption,
    currentPage,
    pages,
    openCatModal,
    getCatLength,
    item
}) => {

    /*===========================================*/

    return (
        <div className="menu-filter">
            <div className="myContainer">
                <div className="menu-filter-content-all">
                    <div className="left">
                        <div className="left-content">
                            <div className="page-number">
                                <p className="mb-0" style={{ color: "var(--dark)" }}>
                                    Showing page {currentPage} of {pages} pages
                                </p>
                            </div>
                            <div className="filter-icon">
                                {/* show the categories modal */}
                                <span
                                    onClick={() => openCatModal()}
                                ><FaFilter />Categories</span>
                            </div>
                            <div>
                                <div className="icons d-flex gap-2">
                                    <span
                                        title="Grid View"
                                        onClick={() => changeToGridViewHandler()}
                                        className={!view ? "active" : ""}>
                                        <FaGrip />
                                    </span>
                                    <span
                                        title="List View"
                                        onClick={() => changeToLIstViewHandler()}
                                        ref={spanRef}
                                        className={view ? "active" : ""}>
                                        <FaList />
                                    </span>
                                </div>
                                <div className="select-box">
                                    <select
                                        id="sort"
                                        value={sortOption}
                                        //defaultValue="default"
                                        onChange={(e) => handleSortChange(e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="default"> Default</option>
                                        <option value="A-Z">A-Z</option>
                                        <option value="Z-A">Z-A</option>
                                        <option value="low-to-high">Low to High</option>
                                        <option value="high-to-low">High to Low</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={view ? "all-filters-items change-to-list-view" : "all-filters-items"}>
                            {/* show the style of cards if [list or grid] based on view state */}
                            {
                                loading
                                    ?
                                    <Spinner />
                                    :
                                    allItems?.map((el, idx) => (
                                        view
                                            ? <SingleCardListView key={idx} product={el} />
                                            : <SingleCard key={idx} product={el} />
                                    ))
                            }
                        </div>
                    </div>
                    {/* side bar */}
                    <div className="right right-sidebar">
                        <MenuFilterSidebar
                            showAll={showAll}
                            selectedCategory={selectedCategory}
                            filterItems={filterItems}
                            getCatLength={getCatLength}
                            item={item}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuFilter;