import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


function Protected({children}) {
    const currentUser = useSelector((state)=>state.user)

    if(!currentUser){
        return <Navigate to='/sign-up' replace={true}></Navigate>
    }
    return children;
}

export default Protected;