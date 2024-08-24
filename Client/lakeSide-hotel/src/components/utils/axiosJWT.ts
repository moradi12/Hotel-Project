import axios from 'axios';
import { updateTokenAction } from '../common/Redux/AuthReducer'; // Ensure this import is correct
import { hotelSystem } from '../common/Redux/store';

const axiosJWT = axios.create();

axiosJWT.interceptors.request.use(
    request => {       
        const token = hotelSystem.getState().auth.token;
        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }
        console.log("BEFORE POST", request.headers.Authorization);
        return request;
    },
    error => {
        // Handle request error
        return Promise.reject(error);
    }
);

axiosJWT.interceptors.response.use(
    response => {
        const authorization = response.headers.authorization;
        if (authorization) {
            const token = authorization.split(' ')[1];
            hotelSystem.dispatch(updateTokenAction(token));
            sessionStorage.setItem('jwt', token);               
        }
        return response;
    },
    error => {
        // Handle response error
        return Promise.reject(error);
    }
);

export default axiosJWT;
