import { Outlet,NavLink,Link } from "react-router";
import {useEffect,useRef} from "react";
import { Collapse } from "bootstrap";
import Toast from "../../components/Toast"
// 環境變數
// const {VITE_BASE_URL, VITE_API_PATH} = import.meta.env; 

function AdminLayout(){
    const bsCollapse = useRef(null);
    const toggleRef = useRef(null);
    const brandClass = ({isActive})=>{
        return isActive ? 'navbar-brand linkisActive': 'navbar-brand';
    }
    const navLinkClass = ({isActive})=>{
        return isActive ? 'nav-link linkisActive position-relative px-3': 'nav-link position-relative px-3';
    }
    const closeNavbar = () => {
        if(bsCollapse.current){
            bsCollapse.current.hide();
        }
    }
    useEffect(()=> {
        if(toggleRef.current){
            bsCollapse.current = new  Collapse(toggleRef.current,{
                toggle: false
            })
        }
    },[])
    return (
        <>
    <nav className="navbar navbar-wood  navbar-expand-lg fixed-top shadow-sm">
            <div className="container-fluid">
                <NavLink className={brandClass} onClick={closeNavbar}  to="/admin">
                    <span className="brand-logo"></span>
                    夠可愛毛小孩
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
                        <li className="nav-item">
                            <NavLink className={navLinkClass} onClick={closeNavbar}  to="adminProducts">寵物列表</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={navLinkClass} onClick={closeNavbar}  to="adminOrders">訂單列表</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink  className={navLinkClass} onClick={closeNavbar}  to="/">回到前台</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
    </nav>
    <div className="content-area" style={{ paddingTop: '65px' }}>
            <Outlet />
    </div>
        <Toast />
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
        </>
    )
    }

export default AdminLayout;