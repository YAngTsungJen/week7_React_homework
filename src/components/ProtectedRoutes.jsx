import axios from 'axios';
import { useEffect, useState } from 'react';
import {RotatingTriangles} from "react-loader-spinner";
import { Navigate } from 'react-router';
const {VITE_BASE_URL, VITE_API_PATH} = import.meta.env; 
function ProtectedRoutes({children}){
    const [isAuth, setIsAuth] = useState(false);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)onion\s*=\s*([^;]*).*$)|^.*$/,"$1",
        );
        if(token){
        axios.defaults.headers.common['Authorization'] = token;
        }
        const checkLogin = async()=>{
        try {
            const res = await axios.post(`${VITE_BASE_URL}/api/user/check`);
            console.log(res);
            setIsAuth(true);
        } catch (error) {
            console.log('驗證錯誤：請重新登入',error.response?.data.message)
            setIsAuth(false);
        }finally{
            setLoading(false);
        }
    }
    checkLogin();
    },[loading]);
    if(loading) {
        return(
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: 9999
        }}>
            <RotatingTriangles/>
        </div>)
    }
    if (!isAuth) return <Navigate to="/login" />;
    return children
}
export default ProtectedRoutes;