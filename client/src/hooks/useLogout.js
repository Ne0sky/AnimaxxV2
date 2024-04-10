import { useUserContext } from "./useUserContext";
import Cookies from "universal-cookie";
export const useLogout = () => {
    const { dispatch } = useUserContext();

    const logout = async () => {
        const cookies = new Cookies();
        cookies.remove('token');
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
        window.open('http://localhost:3000/logout', '_self');
    }

    return { logout };
}