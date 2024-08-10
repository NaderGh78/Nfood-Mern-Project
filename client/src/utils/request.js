import axios from "axios";

/*===========================================*/
/*===========================================*/
/*===========================================*/

// Define the base URL for the API
//  const BASE_URL = "http://localhost:3001";

const BASE_URL = "https://nfood-mern-project.onrender.com";

// Create an axios instance for general requests
export const request = axios.create({
    baseURL: BASE_URL
});

// Create an axios instance for authenticated requests
export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")).token : ""}`
    },
});

// Function to get the token from localStorage
const getToken = () => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
        console.error('User not found in localStorage');
        return null;
    }
    const parsedUser = JSON.parse(user);
    return parsedUser.token || null;
};

// Set up an interceptor to attach the token to requests
userRequest.interceptors.request.use(
    (config) => {
        const token = getToken(); // Get the token dynamically
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Use the latest token
        }
        return config;
    },
    (error) => Promise.reject(error)
); 