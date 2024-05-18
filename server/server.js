const express = require("express");

const cors = require("cors");

const connectDB = require('./config/db');

const app = express();

const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5000;

const authPath = require("./routes/authRoute");

const usersPath = require("./routes/userRoute");

const categoryPath = require("./routes/categoryRoute");

const productPath = require("./routes/productRoute");

const cartPath = require("./routes/cartRoute");

const { errorHandling, notFound } = require("./middlewares/errorHandling");

/*===========================================*/
/*===========================================*/
/*===========================================*/

connectDB();

// middleware
const corsOptions = {
  origin: "nfood-mern-project.vercel.app", // frontend URI (ReactJS)
}

// app.use(cors(corsOptions));

app.use(cors());

app.use(express.json());

// app.use('/images', express.static('./uploads')) 

app.use("/api/auth", authPath);

app.use("/api/users", usersPath);

app.use("/api/categories", categoryPath);

app.use("/api/products", productPath);

app.use("/api/carts", cartPath);

/*=================================*/

// Error Hanlder Middleware
app.use(notFound);

app.use(errorHandling);

app.listen(PORT, () => {

  console.log(`the server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)

}); 