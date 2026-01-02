import { Navigate } from "react-router";


export const AuthRoute = ({children}) => {
    // const navigate = useNavigate()
    let token = localStorage.getItem("user_token");
    if(token) {
       return <>{children}</>
    }else {
        return <Navigate to={"/login"} replace></Navigate>
    }
    
}