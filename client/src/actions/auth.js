import axios from 'axios';
import cookie from 'js-cookie';

const API = 'http://localhost:5000';

export const signin = async data => {
    const res = await axios.post(`${API}/api/auth/signin`, data);
    return res;
};

export const signup = async data => {
    let res = await axios.post(`${API}/api/auth/signup`, data);
    return res;
};

export const getdata = async()=>{
    let res = await axios.get(`${API}/api/v1/user/getdata`)
    return res
}

export const signout = async next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
    let res = await axios.post(`${API}/api/auth/signout`);
    return res;
};

export const removeCookie = async key => {
    if (process.browser) {
        cookie.remove(key, {
            expires: 1,
        });
    }
};

export const getCookie = key => {
    if (process.browser) {
        return cookie.get(key);
    }
};

export const setCookie = async (key, val) => {
    if (process.browser) {
        cookie.set(key, val, {
            expires: 1,
        });
    }
};

export const isAuth = () => {
    if (process.browser) {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
};

export const authenticate = (data, next) => {
    console.log(data);
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
    next();
};

export const setLocalStorage = async (k, v) => {
    if (process.browser) localStorage.setItem(k, JSON.stringify(v));
};

export const removeLocalStorage = (k, v) => {
    if (process.browser) localStorage.removeItem(k);
};
