import axios from 'axios';
import { useEffect, useState } from 'react';
import {RotatingTriangles} from "react-loader-spinner";
import { Navigate } from 'react-router';
import useMessage from '../hooks/useMessage';
const {VITE_BASE_URL} = import.meta.env; 
function ProtectedRoutes({children}){
    const [isAuth, setIsAuth] = useState(false);
    const [loading,setLoading] = useState(true);
    const {showError} = useMessage();
    useEffect(()=>{
        const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)onion\s*=\s*([^;]*).*$)|^.*$/,"$1",
        );
        if(token){
        axios.defaults.headers.common['Authorization'] = token;
        }
        const checkLogin = async()=>{
        try {
            await axios.post(`${VITE_BASE_URL}/api/user/check`);
            setIsAuth(true);
        } catch (error) {
            showError(error.response?.data.message)
            setIsAuth(false);
        }finally{
            setLoading(false);
        }
    }
    checkLogin();
    },[loading,showError]);
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