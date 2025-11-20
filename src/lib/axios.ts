import axios from "axios";

const instance = axios.create({
  // Use a relative path to work with your Next.js rewrite
  baseURL: "/", 
  
  // This is mandatory for sending session cookies
  withCredentials: true, 
});

export default instance;