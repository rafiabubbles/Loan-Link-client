import axios from "axios";
import { getAuth } from 'firebase/auth'; // 💡 Firebase Auth ইমপোর্ট করা হলো

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json"
  }
});

// 🚀 রিকোয়েস্ট ইন্টারসেপ্টর যুক্ত করা হলো
api.interceptors.request.use(async (config) => {
    // 1. Firebase Auth ইনস্ট্যান্স পাওয়া
    const auth = getAuth();
    const currentUser = auth.currentUser;

    // 2. যদি ইউজার লগইন করা থাকে
    if (currentUser) {
        try {
            // 3. Firebase থেকে বর্তমান আইডি টোকেন নেওয়া
            const token = await currentUser.getIdToken(); 
            
            // 4. Authorization হেডার সেট করা
            config.headers.Authorization = `Bearer ${token}`;
            
        } catch (error) {
            console.error("Error getting Firebase ID Token:", error);
            // টোকেন পেতে ব্যর্থ হলে, টোকেন যোগ না করেই রিকোয়েস্ট পাঠানো হবে (যা 401 দেবে)
        }
    }
    // 5. রিকোয়েস্ট কনফিগারেশনটি ফেরত পাঠানো
    return config;
}, (error) => {
    // রিকোয়েস্ট পাঠানোর সময় কোনো ত্রুটি হলে
    return Promise.reject(error);
});

export default api;