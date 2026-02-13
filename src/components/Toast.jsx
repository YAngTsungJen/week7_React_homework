import {useSelector } from "react-redux";
function Toast(){
    const messages = useSelector(state => state.message); // [{....}]
    return(<>
        <div className="toast-container position-fixed top-0 end-0 p-3" style={{marginTop: '65px', zIndex: 1500 }}>
            {
                messages.map((message)=> {
                    return (
                <div key={message.id} className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className={`toast-header bg-${message.type} text-white`}>
                        <strong className="me-auto">{message.title}</strong>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            data-bs-dismiss="toast"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="toast-body">{message.text}</div>
                </div>
                    )
                })
            }
        </div>
    </>)
}
export default Toast;