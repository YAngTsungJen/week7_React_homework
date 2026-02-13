import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../slices/ToastSlice";
createAsyncMessage
function useMessage(){
    const dispatch = useDispatch();
    const showSuccess = (message) => {
        dispatch(createAsyncMessage({
            success: true,
            message
        }))
    };
    const showError = (message) => {
        dispatch(createAsyncMessage({
            success: false,
            message
        }))
    };
    return {
        showError,
        showSuccess
    }
}

export default useMessage;