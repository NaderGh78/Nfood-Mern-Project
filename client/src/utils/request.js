import axios from "axios";

/*===========================================*/
/*===========================================*/
/*===========================================*/

//const BASE_URL = "http://localhost:3001"; 

//const BASE_URL = "https://nfood-mern-project.onrender.com";

const BASE_URL = "https://nfood-mern-project.onrender.com";

const TOKEN = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).token :
    "";

export const request = axios.create({
    baseURL: BASE_URL
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { Authorization: `Bearer ${TOKEN}` },
}); 