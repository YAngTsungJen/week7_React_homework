// 這裡定義單個圓圈的樣式
const Circle = ({ number, title, active }) => (
    <div className="text-center" style={{ zIndex: 2 }}>
        <div 
        className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2 ${active ? 'bg-success text-white' : 'bg-light text-muted'}`}
        style={{ 
            width: '64px', height: '64px', fontSize: '14px',
            border: active ? 'none' : '1px solid #dee2e6',
            fontWeight: 'bold', lineHeight: '1.2'
        }}
        >
        <span>{number}.<br />{title}</span>
        </div>
    </div>
    );

    function StepCircle({ currentStep }) {
    return (
        <div className="row justify-content-center mb-5 mt-4">
        <div className="col-md-8 d-flex justify-content-between align-items-center position-relative">
            {/* 背景橫線 */}
            <div className="position-absolute top-50 start-0 end-0 border-bottom" style={{ zIndex: 1, transform: 'translateY(-15px)' }}></div>
            
            <Circle number="1" title="清單確認" active={currentStep >= 1} />
            <Circle number="2" title="資料填寫" active={currentStep >= 2} />
            <Circle number="3" title="付款確認" active={currentStep >= 3} />
            <Circle number="4" title="完成訂單" active={currentStep >= 4} />
        </div>
        </div>
    );
}

export default StepCircle;