const asynHandler = require("express-async-handler");
const { CartModel } = require("../models/CartModel");
const { ProductModel } = require("../models/ProductModel");

/*===========================================*/
/*===========================================*/
/*===========================================*/

/**
 * @desc get all cart
 * @route api/carts/
 * @method Get
 * @access public  
*/

const getAllCartsCtrl = asynHandler(

  async (req, res) => {

    const allCarts = await CartModel.find();

    res.status(200).json(allCarts);

  }

);

/*===========================================*/

/**
 * @desc get user cart
 * @route api/carts/
 * @method Get
 * @access private (user himself and admin only)    
*/

const getUserCartCtrl = asynHandler(

  async (req, res) => {

    const userId = req.userDecoded.id;

    const cart = await CartModel.findOne({ userId: userId }).populate("products.product");

    res.status(200).json({
      message: "my cart",
      data: { cart }
    });

  }

);

/*===========================================*/

/**
 * @desc create cart
 * @route /api/carts
 * @method Post
 * @access private (user himself only) 
*/

const creatCartCtrl = asynHandler(async (req, res) => {

  try {

    // Check if user is logged in
    const userId = req.userDecoded.id;

    const { productId, quantity } = req.body;

    // Fetch product details
    const productInfo = await ProductModel.findById(productId);

    if (!productInfo) {

      return res.status(400).json({ message: "Product not found." });

    }

    // Calculate price based on the new price or the default price
    const price = productInfo.newPrice !== 1
      ? (quantity * productInfo.newPrice).toFixed(2)
      : (quantity * productInfo.price).toFixed(2);

    // console.log('Product Info:', productInfo);
    // console.log('Requested Quantity:', quantity);
    // console.log('Price Calculation - New Price:', productInfo.newPrice, 'Default Price:', productInfo.price);
    // console.log('Calculated Price:', price);

    // Find or create the cart
    let cart = await CartModel.findOne({ userId: userId });

    if (!cart) {
      cart = new CartModel({
        userId: userId,
        products: [],
        totalAmount: 0,
      });
    }

    // Check if the item is already in the cart
    const itemIndex = cart.products.findIndex(p => p.product.toString() === productId);

    if (itemIndex > -1) {

      // Update existing item
      // console.log('Item already in cart:', cart.products[itemIndex]);

      cart.products[itemIndex].quantity += quantity - cart.products[itemIndex].quantity;

      cart.products[itemIndex].price = price;

      // console.log('Updated Item:', cart.products[itemIndex]);

    } else {

      // Add new item
      cart.products.push({ product: productId, quantity, price: parseFloat(price) });

      // console.log('Added New Item:', cart.products[cart.products.length - 1]);

    }

    // Calculate the total amount
    const totalAmount = cart.products.reduce((total, item) => total + item.price, 0);

    cart.totalAmount = totalAmount.toFixed(2);

    // console.log('Total Amount:', cart.totalAmount);

    // Save the cart
    const cartInfo = await cart.save();
    // console.log('Saved Cart Info:', cartInfo);

    return res.status(200).json({
      message: "Added to cart",
      data: { cartInfo }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong");
  }

});

/*===========================================*/

/**
 * @desc remove single cart
 * @route api/carts/:id
 * @method Delete
 * @access private (user himself and admin only) 
*/

const deleteCartCtrl = asynHandler(

  async (req, res) => {

    // check if user logged
    const userId = req.userDecoded.id;

    const { productId } = req.params;

    const cartInfo = await CartModel.findOne({ userId: userId });

    if (!cartInfo) {
      return res.status(400).json({ message: "Cart not found." });
    }

    const productInfo = await ProductModel.findById(productId);

    /*
    by defualt the [newprice] is 1 as we put it in product modal,
    if there is a [newprice] for item, we save it in cart info,
    and when newPrice greater than 1 that mean exist a [newprice] for item,
    therfore the total will pull the [price or newprice] from cart when we 
    remove the item
    */
    // const twoPriceValues = productInfo.newPrice !== 1 ?
    //   cartInfo.products.find(item => item.product == productId).newPrice :
    //   cartInfo.products.find(item => item.product == productId).price;  

    const price = cartInfo.products.find(item => item.product == productId).price;

    /*
    or 
    const productObj = cartInfo.products.find(item=>item.product== productId);
    const price = productObj.price;
    [item.product] is the id that we enter in database 
    
    // price = 1000
    // totalAmount = 1500
    // totalAmount = totalAmount - price
    // totalAmount = 500 this last totalAmount
    */

    let cart = await CartModel.findOneAndUpdate(
      { userId: userId },
      {
        $pull: { products: { product: productId } },
        $inc: { totalAmount: -price }
      },
      { new: true }
    )

    return res.status(200).json({
      message: "Cart remove",
      data: { cart }
    })

  }

);

/*===========================================*/

/**
 * @desc empty user cart
 * @route api/carts/
 * @method Delete
 * @access private (user himself and admin only)    
*/

const emptyUserCardCtrl = asynHandler(

  async (req, res) => {

    try {

      const userId = req.userDecoded.id;

      // console.log(`Clearing cart for user: ${userId}`);

      const cart = await CartModel.findOneAndDelete({ userId: userId });

      // console.log(`Deleted cart: ${cart}`);

      res.status(200).json({
        message: "All your cart removed successfully.",
        data: { cart }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to clear cart" });
    }

  }

);

/*===========================================*/

module.exports = {
  getAllCartsCtrl,
  getUserCartCtrl,
  creatCartCtrl,
  deleteCartCtrl,
  emptyUserCardCtrl
}