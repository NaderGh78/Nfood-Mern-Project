import { createBrowserRouter, createHashRouter } from "react-router-dom";
import {
    Home,
    NotFound,
    Layout,
    MenuFood,
    Search,
    Cart,
    Register,
    Login,
    ItemDetails,
    Checkout,
    About,
    Contact,
    AdminMain,
    Admin,
    AdminOrdersTable,
    AdminCutomersTable,
    AdminFoodCategories,
    UserProfile,
    Order,
    Account,
    Password,
    Wishlist,
    AdminProducts,
    CheckoutInformation,
    CheckoutShipping,
    OrderConfirmed,
    AdminOrderDetails
} from "../allPagesPaths";
import ProtectRoute from "./ProtectRoute";

/*===========================================*/
/*===========================================*/
/*===========================================*/

export const router = createHashRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/menu",
                element: <MenuFood />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/products/:id",
                element: <ItemDetails />
            },
            {
                path: "/search",
                element: <Search />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/checkout",
                element: <Checkout />,
                children: [
                    {
                        index: true,
                        element: <CheckoutInformation />
                    },
                    {
                        path: "shipping",
                        element: <CheckoutShipping />
                    }
                ]
            },
            {
                path: "/order-confirm",
                element: <OrderConfirmed />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "",
                element: <ProtectRoute />,
                children: [
                    {
                        path: "/profile/:id",
                        element: <UserProfile />,
                        children: [
                            {
                                index: true,
                                element: <Order />
                            },
                            {
                                path: "wishlist",
                                element: <Wishlist />
                            },
                            {
                                path: "account",
                                element: <Account />
                            },
                            {
                                path: "password",
                                element: <Password />
                            }
                        ]
                    }
                ]
            },
            {
                path: "/admin",
                element: <Admin />,
                children: [
                    {
                        index: true,
                        element: <AdminMain />
                    },
                    {
                        path: "products",
                        element: <AdminProducts />
                    },
                    {
                        path: "orders",
                        element: <AdminOrdersTable />
                    },
                    {
                        path: "customers",
                        element: <AdminCutomersTable />
                    },
                    {
                        path: "categories",
                        element: <AdminFoodCategories />
                    },
                    {
                        path: "orders/:id",
                        element: <AdminOrderDetails />
                    },
                ]
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
]);