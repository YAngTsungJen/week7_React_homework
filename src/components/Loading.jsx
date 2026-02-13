import { ThreeDots } from "react-loader-spinner";
function Loading({isLoading}){
    if(!isLoading){
        return null
    }else{
        return(<>
            <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 9999,
                    backdropFilter: "blur(3px)",
                }}
                >
                <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="grey"
                    radius="9"
                    ariaLabel="three-dots-loading"
                />
            </div>
            </>)
    }
}
export default Loading;