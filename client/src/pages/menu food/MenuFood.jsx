import "./menuFood.css";
import { useEffect, useRef, useState } from "react";
import { request } from "../../utils/request";
import { useTitle } from "../../components/helpers";
import { HeadingBreadcrumb, MenuFilter, MenuFilterModal, Pagination } from "../../allPagesPaths";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const MenuFood = () => {

    // get the page title
    useTitle(`Menu - Nfood`);

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(false);

    const [item, setItem] = useState([]);

    const [filteredItems, setFilteredItems] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("all");

    const [sortOption, setSortOption] = useState("default");

    const [currentPage, setCurrentPage] = useState(1);

    const [itemsPerPage] = useState(6); // Number of items to display per page

    // to switch between [grid or list] cards view in menu page
    const [view, setView] = useState(JSON.parse(localStorage.getItem("change-view")) || false);

    // this useRef in order change the [active class] in case we switch between [grid or list] cards view in menu page
    const spanRef = useRef();

    // this for the filter category modal 
    const [showCatModal, setShowCatModal] = useState(false);

    const handleCloseCatModal = () => setShowCatModal(false);

    const handleShowCatModal = () => setShowCatModal(true);

    /*===========================================*/

    // save the view state in localstorage
    useEffect(() => {
        localStorage.setItem("change-view", view);
    }, [view]);

    // make the list view
    const changeToLIstViewHandler = () => {
        setView(true);
    }

    // back the view to grid view
    const changeToGridViewHandler = () => {
        setView(false);
    }

    /*===========================================*/

    // get all products to draw slider ui
    useEffect(() => {

        const getProducts = async () => {

            try {

                setLoading(true);

                const res = await request.get(`/api/products`);

                if (res && res?.data) {

                    const { products } = res?.data;

                    setProducts(products);

                    setLoading(false);

                }

            } catch (error) {
                console.log(error)
            }
        };

        getProducts();

    }, [currentPage]);

    /*===========================================*/

    // after we get the all products , check if there is a products,to do something
    useEffect(() => {
        if (products?.length) {
            setItem(products);
            setFilteredItems(products);
        }
    }, [products]);

    /*===========================================*/

    // filter the category that given in products,and update the others state depend on categories filter
    const filterItems = (category) => {
        const filtered =
            category === "all"
                ? item
                : item?.filter((item) => item.category === category);

        setFilteredItems(filtered);
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    /*===========================================*/

    // get the length of every choosen category that inside the arr
    const getCatLength = (currentCat) => {
        const getFilterCat = item?.filter((item) => item.category === currentCat);
        const catLength = getFilterCat.length;
        return catLength;
    }

    /*===========================================*/

    // if the category is [all] show all products
    const showAll = () => {
        setFilteredItems(item);
        setSelectedCategory("all");
        setCurrentPage(1);
    };

    /*===========================================*/

    const handleSortChange = (option) => {

        setSortOption(option);

        // Logic for sorting based on the selected option
        let sortedItems = [...filteredItems];

        switch (option) {
            case "default":
                sortedItems.sort((a, b) => { return a._id > b._id ? 1 : -1; });
                break;
            case "A-Z":
                sortedItems.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "Z-A":
                sortedItems.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "low-to-high":
                sortedItems.sort((a, b) => a.price - b.price);
                break;
            case "high-to-low":
                sortedItems.sort((a, b) => b.price - a.price);
                break;
            default:
                // Do nothing for the "default" case
                break;
        }

        setFilteredItems(sortedItems);

        setCurrentPage(1);

    };

    /*===========================================*/

    // the pagination
    const pages = Math.ceil(filteredItems?.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;

    const finishIndex = currentPage * itemsPerPage;

    const allItems = filteredItems?.slice(startIndex, finishIndex);

    /*===========================================*/

    return (
        <div className="menu-food">
            <HeadingBreadcrumb breadcrumb="Menu Restaurant" />
            <MenuFilter
                loading={loading}
                allItems={allItems}
                view={view}
                changeToLIstViewHandler={changeToLIstViewHandler}
                changeToGridViewHandler={changeToGridViewHandler}
                spanRef={spanRef}
                filterItems={filterItems}
                selectedCategory={selectedCategory}
                showAll={showAll}
                handleSortChange={handleSortChange}
                sortOption={sortOption}
                currentPage={currentPage}
                pages={pages}
                openCatModal={handleShowCatModal}
                getCatLength={getCatLength}
                item={item}
            />

            {/* if there are products show the pagination , otherwise no */}
            {
                item.length > 0 &&
                <Pagination
                    pages={pages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            }

            {/* open categories modal in small devices */}
            <MenuFilterModal
                showCatModal={showCatModal}
                closeCatModal={handleCloseCatModal}
                showAll={showAll}
                selectedCategory={selectedCategory}
                filterItems={filterItems}
                getCatLength={getCatLength}
                item={item}
            />
        </div>
    )
}

export default MenuFood;