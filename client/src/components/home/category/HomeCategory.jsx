import "./homeCategroy.css";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const HomeCategory = () => {

    const allCategories = [
        { id: 1, catImag: "/assets/images/category/img1.png", catName: "Main Dish", catDishes: "86 dishes" },
        { id: 2, catImag: "/assets/images/category/img2.png", catName: "Break Fast", catDishes: "12 break fast" },
        { id: 3, catImag: "/assets/images/category/img3.png", catName: "Dessert", catDishes: "48 dessert" },
        { id: 4, catImag: "/assets/images/category/img4.png", catName: "Browse All", catDishes: "255 Items" },
    ];

    /*===========================================*/

    return (
        <div className="home-category">
            <div className="myContainer">
                <div className="home-category-box">
                    <h5 className="text-center homeH5">CUSTOMER FAVORITES</h5>
                    <h2 className="text-center homeH2">Popular Catagories</h2>
                    <div className="all-categories">
                        {allCategories.map(el => (
                            <div className="single-category text-center" key={el.id}>
                                <div className="img-box">
                                    <img src={process.env.PUBLIC_URL + el.catImag} alt={`category ${el.id}`} />
                                </div>
                                <h5>{el.catName}</h5>
                                <span>({el.catDishes})</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeCategory;