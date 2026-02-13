import { useNavigate,Link,useOutletContext} from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import {thousandsStamp} from "../../utils/thousandsStamp";
import useMessage from '../../hooks/useMessage'
const {VITE_BASE_URL,VITE_API_PATH} = import.meta.env;

function Products(){
    const [products,setProducts] = useState([]);
    const [pages,setPages] = useState({});
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isLoading,setIsLoading] = useState({});
    const navigate = useNavigate();
    const { updateNavbarCart } = useOutletContext();
    const {showError,showSuccess} = useMessage();
    const getProducts = async(page = 1) => {
        setIsPageLoading(true);
        try {
            const res = await axios.get(`${VITE_BASE_URL}/api/${VITE_API_PATH}/products?page=${page}`)
            setProducts(res.data.products);
            setPages(res.data.pagination)
        } catch (error) {
            console.log(error);
        }finally{
            setIsPageLoading(false);
        }
    };
    useEffect(()=>{
        getProducts();
    },[]);
    const handlePageChange = (e,page) =>{
        e.preventDefault();
        getProducts(page);
    }
    const changeWebsite = (e,product) => {
        setIsLoading((pre) => ({
            ...pre,
            [product.id]: 'details'
        }));
        e.preventDefault();
        setTimeout(()=> {
            navigate(`/singleProduct/${product.id}`)
        setIsLoading((pre) => ({
            ...pre,
            [product.id]: null
        }));
        },500)
    }
    const AddCart = async(e,product_id,qty=1)=> {
        e.preventDefault();
        setIsLoading((pre) => ({
            ...pre,
            [product_id]: 'cart'
        }));
        const data = {
            product_id,qty
        }
        try {
            await axios.post(`${VITE_BASE_URL}/api/${VITE_API_PATH}/cart`,{data})
            await updateNavbarCart();
            showSuccess('已加入清單')
        } catch (error) {
            console.log(error.response.data)
            setIsLoading((pre) => ({
                ...pre,
                [product_id]: false
            }));
            showError('購買失敗，請稍後再試')
        }finally{
            setIsLoading((pre) => ({
                ...pre,
                [product_id]: null
            }));
        }

    }

    return (<>
    <div className="container">
        <h1 className="mt-3">尋找萌寵</h1>
        <nav style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to={'/'}>首頁</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    萌寵列表
                </li>
            </ol>
        </nav>
        <div className="row">
            {
                isPageLoading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                    <p className="mt-2">正在尋找可愛的毛孩...</p>
                </div>
                ) :Products && products.length > 0 ? (<>
                    {products.map(product => {
                            return (
                                <div className="col-12 col-md-6 col-lg-4 mb-4" key={product.id}>
                                    <div className="card h-100 border-0 shadow-sm product-card">
                                        <div className="ratio ratio-4x3 overflow-hidden">
                                            <img src={product.imageUrl} className="object-fit-cover h-100 w-100" alt={product.title}/>
                                        </div>
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title mb-1">{product.title}
                                                <span className="badge bg-primary ms-2">{product.category}</span>
                                            </h5>
                                            <div className="text-muted small mb-2" style={{minHeight:"72px"}}>
                                                <div className="text-truncate">性格描述：{product.description}</div>
                                                <div className="text-truncate">品種細節：{product.content}</div>
                                            </div>
                                            <div className="mt-auto d-flex align-items-baseline gap-2">
                                                <span className="text-danger fw-bold fs-5">
                                                    NT$ {thousandsStamp(product.price)}
                                                </span>
                                                <div className="mb-0">
                                                    <del className="text-muted sx-small">{thousandsStamp(product.origin_price)}</del>
                                                </div>
                                            </div>
                                            <div className="d-flex gap-2">
                                                <button type="button" className="btn btn-outline-primary flex-fill" disabled={isLoading[product.id] === 'cart'} onClick={(e)=> changeWebsite(e,product)}>了解更多
                                                    {
                                                        isLoading[product.id] === 'details' && (<span className="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>)
                                                    }
                                                </button>
                                                <button className="btn btn-dark flex-fill" disabled={isLoading[product.id] === 'details'} onClick={(e)=> AddCart(e,product.id,1)}>立即購買
                                                    {
                                                        isLoading[product.id] === 'cart' && (<span className="spinner-border spinner-border-sm ms-2"></span>)
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination pages={pages} handlePageChange = {handlePageChange}/>
                    </div>
                </>): 
                (<div className="text-center py-5">
                    <p className="fs-4">目前暫時沒有毛孩在尋找新家喔</p>
                    <Link to="/" className="btn btn-outline-dark">回到首頁</Link>
                </div>)
            }
        </div>
    </div>
    </>)
}

export default Products;