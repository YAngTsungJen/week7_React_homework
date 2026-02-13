import { useNavigate } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import {thousandsStamp} from '../../utils/thousandsStamp'
const {VITE_BASE_URL,VITE_API_PATH} = import.meta.env;

function Home(){
    const navigate = useNavigate();
    const [products,setProducts] = useState([]);
    const getProducts = async() => {
        const res = await axios.get(`${VITE_BASE_URL}/api/${VITE_API_PATH}/products`)
        setProducts(res.data.products.slice(-4));
    };
    useEffect(()=>{
        (async()=>{
            try {
                await getProducts();
            } catch (error) {
                console.log(error);
            }
        })();
    },[]);
    const changeToProducts = (e) => {
        e.preventDefault();
        navigate('/products')
    }
    const changeToSingleProduct = (e,product) => {
        e.preventDefault();
        navigate(`/SingleProduct/${product.id}`)
    }
    return(<>
    <div className="container-fluid px-0 overflow-hidden">
        <header className="position-relative w-100 vh-100 d-flex align-items-center justify-content-center overflow-hidden">
            <div className="banner position-absolute top-0 start-0 w-100 h-100"></div>
            <div className="container position-relative text-center text-white z-2">
                <h2 className="display-5 fw-light mb-2 opacity-75">這裡，是幸福毛孩故事的起點。</h2>
                <h1 className="display-1 fw-bold mb-4" style={{ letterSpacing: '6px' }}>夠可愛毛小孩</h1>
                <p className="fs-4 fw-light mb-4 opacity-75">
                    家不只是一間房間，更是與毛拔麻共享愛的小窩。 <br />
                        我們精選最適合家庭的萌寵與用品，為你們的日常增添最純粹的快樂。
                </p>
                <button onClick={(e)=> changeToProducts(e)} type="button" className="btn btn-light rounded-0 px-5 py-3 fw-bold">
                    探索萌寵
                </button>
            </div>
        </header>
        <section>
            <div className="container py-4">
                <div className="text-center">
                    <h2 className="fw-bold mb-4">熱門萌寵</h2>
                </div>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                    {
                        products.map((product)=> {
                            return(
                                <div className="col" key={product.id} >
                                    <div className="card h-100 border-0 product-card text-start" onClick={(e)=> changeToSingleProduct(e,product)} style={{cursor: 'pointer'}}>
                                        <div className="card-body p-0">
                                            <div className="position-relative overflow-hidden" style={{ height: "300px" }}>
                                                <img src={product.imageUrl} className="card-img-top rounded-0 object-fit-cover h-100 w-100 product-img" alt={product.title}
                                                />
                                            </div>
                                            <div className="p-3">
                                                <h5 className="card-title mt-1">{product.title}<span className="card-subtitle mb-2 text-muted">   {product.category}</span></h5>
                                                <p className="card-text fw-bold text-muted text-end">
                                                    {thousandsStamp(product.price)} 元
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                        })
                    }
                </div>
            </div>
        </section>
        <div className="subscribe" style={{backgroundImage:"url('https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1584&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",height:'600px',backgroundPosition: 'center center',backgroundSize: 'cover'}}>
            <div className="container d-flex flex-column justify-content-end h-75 text-secondary">
                <div className="row d-flex" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500">
                    <div className="col-md-6 col-lg-5 offset-lg-1 bg-white bg-opacity-75 p-4 p-lg-5 rounded-0 shadow-sm">
                        <div className="display-6 fw-bold mb-2">
                            愛牠，就給牠最好的！
                        </div>
                        <p className="fs-5 mb-4">訂閱 SKY TREE 寵物誌，獲取更多養育心得與專屬優惠。</p>
                        <form className="d-flex mt-2 mt-lg-4">
                            <input type="text" className="form-control p-3 h-100" placeholder="Your email address" aria-label="Your email address"/>
                            <button type="submit" className="btn btn-primary px-5">立即訂閱</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>)
}
export default Home;