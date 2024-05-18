const dotenv = require("dotenv");
const connectDB = require("../config/db");
const products = require("../data/products");
const { ProductModel } = require("../models/ProductModel");
dotenv.config();
connectDB();

/*===========================================*/
/*===========================================*/
/*===========================================*/

const seedProducts = async () => {
    try {

        await ProductModel.deleteMany();

        console.log("Products are deleted.");

        await ProductModel.insertMany(products);

        console.log("All products are added.");

        process.exit();

    } catch (error) {

        console.log(error.message);

        process.exit();

    }
}

seedProducts();