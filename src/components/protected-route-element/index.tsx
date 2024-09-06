import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import { PATH } from "../../utils/constants";
import { ProtectedRouteElementProps } from "./types";

export const ProtectedRouteElement = ({ element }: ProtectedRouteElementProps) => {
    const location = useLocation();
    const auth = getCookie('accessToken');

    return( auth ? element : <Navigate to={PATH.SIGNIN} state={{ from: location }} />)
}
