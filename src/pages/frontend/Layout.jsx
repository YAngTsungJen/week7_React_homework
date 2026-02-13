import { Outlet,NavLink,Link } from "react-router";
import {useState,useEffect,useRef,useCallback} from "react";
import axios from "axios";
import { Collapse } from "bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
const {VITE_BASE_URL,VITE_API_PATH} = import.meta.env;
function Layout(){
    const [cartTotal, setCartTotal] = useState(0);
    const toggleRef = useRef(null);
    const bsCollapse = useRef(null);
    useEffect(()=> {
        if(toggleRef.current){
            bsCollapse.current = new  Collapse(toggleRef.current,{
                toggle: false
            })
        }
    },[])
    const closeNavbar = () => {
        if(bsCollapse.current){
            bsCollapse.current.hide();
        }
    }
    const navLinkClass = ({isActive})=>{
        return isActive ? 'nav-link linkisActive position-relative px-3': 'nav-link position-relative px-3';
    }
    const brandClass = ({isActive})=>{
        return isActive ? 'navbar-brand linkisActive': 'navbar-brand';
    }
    const updateNavbarCart = useCallback(async()=> {
        try {
            const res = await axios.get(`${VITE_BASE_URL}/api/${VITE_API_PATH}/cart`)
            const total = res.data.data.carts.reduce((acc,cur) => acc+ cur.qty,0);
            setCartTotal(total);
        } catch (error) {
            console.log(error)
        }
    },[])
    useEffect(()=> {
        const timer = setTimeout(() => {
                updateNavbarCart();
            }, 0);
            return () => clearTimeout(timer);
    },[updateNavbarCart])
    return(<>
    <nav className="navbar navbar-wood  navbar-expand-lg fixed-top shadow-sm">
            <div className="container-fluid">
                <NavLink  className={brandClass} onClick={closeNavbar} to="/">
                    <span className="brand-logo"></span>
                    夠可愛毛小孩
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent" ref={toggleRef}>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                        <li className="nav-item">
                            <NavLink className={navLinkClass} onClick={closeNavbar} to="/products">尋找萌寵</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={navLinkClass} onClick={closeNavbar} to="/carts"><FontAwesomeIcon icon={faCartShopping}/>
                            {
                                cartTotal > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.7rem' }}>
                                        {cartTotal > 99 ? '99+' : cartTotal}
                                    </span>)
                            }
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={navLinkClass} onClick={closeNavbar}  to="/login">管理後台</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
    </nav>
    <div className="content-area" style={{ paddingTop: '65px' }}>
            <Outlet context={{ updateNavbarCart }} />
    </div>
    <footer className="bg-dark text-white py-5">
        <div className="container">
            <div className="row gy-4">
                <div className="col-md-4 text-start">
                    <h3 className="fw-bold mb-3" style={{ letterSpacing: '2px' }}>夠可愛毛小孩</h3>
                    <p className="opacity-75 lh-lg">
                        為忙碌的生活點綴純粹的愛，<br />
                        讓毛孩成為家中最溫暖的陪伴，構築你理想中的幸福風景。
                    </p>
                </div>
                <div className="col-md-4 text-start text-md-center">
                    <h5 className="fw-bold mb-3">探索毛孩世界</h5>
                    <ul className="list-unstyled opacity-75">
                        <li className="mb-2"><Link to="/products" className="text-decoration-none text-white">所有萌寵</Link></li>
                    </ul>
                </div>
                <div className="col-md-4 text-start text-md-end">
                    <h5 className="fw-bold mb-3">聯絡萌寵管家</h5>
                    <p className="opacity-75 mb-1">客服專線:02-1234-5678</p>
                    <p className="opacity-75 mb-1">服務時間:Mon - Fri 09:00 - 18:00</p>
                    <p className="opacity-75">信箱:service@socute-pets.com</p>
                </div>
            </div>
            <hr className="my-2 opacity-25" />
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center opacity-50 small">
                <p className="mb-0">© 2026 夠可愛毛小孩 So Cute Pets. All rights reserved.</p>
            </div>
        </div>
    </footer>
    </>)
}
export default Layout;
