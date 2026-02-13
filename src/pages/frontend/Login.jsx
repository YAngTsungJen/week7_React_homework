import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form"
import {emailValidition} from '../../utils/validition'
import { useNavigate } from "react-router";
const { VITE_BASE_URL } = import.meta.env;
function Login(){
    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        mode: "onChange"
    })
  // 登入頁面
    const onSubmit = async(data)=>{
        const loginData = {
            username: data.email,
            password: data.password
        }
        try {
            const res = await axios.post(`${VITE_BASE_URL}/admin/signin`,loginData);
            const {token,expired} = res.data;
            document.cookie = `onion=${token}; expires=${new Date(expired)}`;
            axios.defaults.headers.common['Authorization'] = token;
            navigate('/admin/adminProducts')
            reset();
        } catch (error) {
            console.log('登入失敗:',error);
        }finally{
            setIsLoading(false);
        }
    }
    return (
        <>
            <div className="container login">
                <div className="row justify-content-center">
                    <h1 className="h3 mb-3 font-weight-normal text-center">請先登入</h1>
                    <div className="col-8">
                    <form id="form" className="form-signin" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="username"
                            placeholder="name@example.com"
                            autoFocus
                            {
                                ...register('email',emailValidition)
                            }
                        />
                        <label htmlFor="username">Email address</label>
                        {errors.email && (
                            <p className="text-danger">{errors.email.message}</p>
                        )}
                        </div>
                        <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            {
                                ...register('password',{
                                    required:'請輸入密碼',
                                    minLength: {
                                        value: 6,
                                        message: '密碼長度至少需 6 碼'
                                    }
                                })
                            }
                        />
                        <label htmlFor="password">Password</label>
                        {errors.password && (
                            <p className="text-danger">{errors.password.message}</p>
                        )}
                        </div>
                        <button
                        className="btn btn-lg btn-primary w-100 mt-3"
                        type="submit" disabled= {isLoading}>
                            {
                                isLoading && (<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>)
                            }
                            {isLoading ? '處理中': '登入'}
                        </button>
                    </form>
                    </div>
                </div>
                <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
            </div>
        </>
    )
}

export default Login;