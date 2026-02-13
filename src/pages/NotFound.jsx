import { useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft, faPaw } from '@fortawesome/free-solid-svg-icons';

function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="container vh-100 d-flex flex-column justify-content-center align-items-center text-center">
            <div className="mb-4 text-muted">
                <FontAwesomeIcon icon={faPaw} size="5x" className="opacity-25" />
            </div>
            
            <h1 className="display-1 fw-bold text-secondary">404</h1>
            <h2 className="mb-3 fw-bold">汪！這條小路好像走不通...</h2>
            
            <p className="text-muted fs-5 mb-4">
                糟糕，我們找不到這個頁面。<br />
                這隻小毛孩可能跑去別的地方玩耍了，<br />
                或是地圖上根本沒有這個神秘地點。
            </p>

            <div className="d-flex gap-3">
                <Link to="/" className="btn btn-dark btn-lg rounded-pill px-4 py-2">
                    <FontAwesomeIcon icon={faRotateLeft} className="me-2" />
                    帶我回首頁
                </Link>
                <Link to="/products" className="btn btn-outline-secondary btn-lg rounded-pill px-4 py-2">
                    尋找其他萌寵
                </Link>
            </div>

            <p className="mt-5 text-muted small opacity-75">
                我們將在幾秒鐘後自動帶您回到溫暖的首頁...
            </p>
        </div>
    );
}

export default NotFound;