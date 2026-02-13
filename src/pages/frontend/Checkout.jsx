import { useForm } from "react-hook-form"
import { Link,useOutletContext ,useNavigate} from "react-router";
import axios from "axios";
import 'swiper/css';
import Swal from 'sweetalert2'
import StepCircle from "../../components/StepCircle";
import { useEffect, useState } from "react";
import {emailValidition} from '../../utils/validition';
import {thousandsStamp} from "../../utils/thousandsStamp";
import useMessage from '../../hooks/useMessage'
const {VITE_BASE_URL,VITE_API_PATH} = import.meta.env;
function Checkout (){
    const { updateNavbarCart } = useOutletContext();
    const navigate = useNavigate();
    const {showError,showSuccess} = useMessage();
    const [cartData,setCartData] = useState({
        carts: [],
        funal_total : 0
    });

    const {
        register,
        handleSubmit,
        formState: {errors,isValid},
        reset
    } = useForm({
        mode: "onChange"
    })
    const onSubmit = async(formData) => {
        if(cartData.carts.length === 0){
            return;
        }
        try {
            const data = {
                user: formData,
                message: formData.message
            }
            await axios.post(`${VITE_BASE_URL}/api/${VITE_API_PATH}/order`,{data});
            showSuccess('預約成功')
            await updateNavbarCart();
            reset();
            navigate('/');
        } catch (error) {
            showError(error.response?.data?.message)
        }
    }
    useEffect(()=> {
        const getCart = async () => {
            try {
                const res = await axios.get(`${VITE_BASE_URL}/api/${VITE_API_PATH}/cart`)
                setCartData(res.data.data);
            } catch (error) {
                console.log(error)
            }
        }
        getCart();
    },[])
    return (<>
    <div className="container py-5">
        <StepCircle currentStep= {2}/>
        <div className="row g-5">
            <div className="col-md-7 text-start">
                <h4 className="border-start border-success border-4 ps-2 mb-4 fw-bold text-success">訂購人資訊</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email <span className="text-danger">*</span>
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="請輸入 Email"
                        {
                            ...register('email',emailValidition)
                        }
                    />
                        {errors.email && (
                            <p className="text-danger">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        收件人姓名 <span className="text-danger">*</span>
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="請輸入姓名"
                        {
                            ...register('name',{
                                required: '請輸入收件人姓名',
                                minLength: {
                                    value: 2,
                                    message: '姓名至少 2 個字'
                                }
                            })
                        }
                    />
                    {
                        errors.name && (<p className="text-danger">{errors.name.message}</p>)
                    }
                    </div>
                    <div className="mb-3">
                    <label htmlFor="tel" className="form-label">
                        收件人電話 <span className="text-danger">*</span>
                    </label>
                    <input
                        id="tel"
                        name="tel"
                        type="tel"
                        className={`form-control ${errors.tel ? 'is-invalid' : ''}`}
                        placeholder="請輸入電話"
                        {
                            ...register('tel',{
                                required: '請輸入收件人電話',
                                minLength: {
                                    value: 2,
                                    message: '電話至少 8 碼'
                                },
                                pattern: {
                                    value:/^(0\d{1,2}-?(\d{6,8})|09\d{8})$/,
                                    message: "請輸入正確的電話或手機格式"
                                }
                            })
                        }
                    />
                    {
                        errors.tel && (<p className="text-danger">{errors.tel.message}</p>)
                    }
                    </div>

                    <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                        收件人地址 <span className="text-danger">*</span>
                    </label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        className= {`form-control ${errors.address ? 'is-invalid' : ''}`}
                        placeholder="請輸入地址"
                        {
                            ...register('address',{
                                required: '請輸入收件人地址',
                            })
                        }
                    />
                    {
                        errors.address && (<p className="text-danger">{errors.address.message}</p>)
                    }
                    </div>

                    <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                        留言
                    </label>
                    <textarea
                        id="message"
                        className="form-control"
                        cols="30"
                        rows="10"
                        {...register('message')}
                    ></textarea>
                    </div>
                    <div className="text-end">
                        <Link to="/carts" className="btn btn-dark me-2">返回購物車</Link>
                        <button type="submit" className="btn btn-danger" disabled={!isValid}>
                            送出訂單
                        </button>
                    </div>
                </form>
            </div>
            <div className="col-md-5">
                <div className="card border-0 shadow-sm p-4 bg-white sticky-top" style={{ top: '100px' }}>
                    <h4 className="fw-bold text-success mb-4 text-center">訂單明細</h4>
                    {
                        cartData.carts.map((cart)=> {
                            return (
                            <div className="d-flex mb-3 align-items-center" key={cart.id}>
                                <img 
                                    src={cart.product.imageUrl} 
                                    style={{ width: '80px', height: '60px', objectFit: 'cover' }} 
                                    className="rounded me-3" 
                                    alt={cart.product.title}
                                />
                                <div className="flex-grow-1 text-start">
                                    <div className="fw-bold small">{cart.product.title}</div>
                                    <div className="text-muted extra-small">{cart.qty}{cart.product.unit}毛小孩</div>
                                </div>
                                <div className="fw-bold">${thousandsStamp(cart.product.price)}</div>
                            </div>
                            )
                        })
                    }
                    <hr className="text-muted" />
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">小計</span>
                        <span>NT ${thousandsStamp(cartData.total)}</span>
                    </div>
                
                    
                    <div className="input-group mb-3">
                        <input type="text" className="form-control form-control-sm" placeholder="輸入優惠券代碼" />
                        <button className="btn btn-success btn-sm">套用</button>
                    </div>

                    <div className="d-flex justify-content-between h5 fw-bold text-success mt-3 border-top pt-3">
                        <span>預購總金額</span>
                        <span>NT ${thousandsStamp(cartData.final_total)}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>)
}
export default Checkout;