import axios from 'axios';

const apiService = axios.create({
    baseURL: 'http://localhost:5000/api',
});

apiService.interceptors.request.use(
    (config) =>{

        const token = localStorage.getItem('token');
        console.log('TOKEN:', token); // ← ye add karo
        console.log('URL:', config.url); // ← ye bhi

        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        return config;
    }, 
    error => {
        return Promise.reject(error);
    }
);

export default apiService;