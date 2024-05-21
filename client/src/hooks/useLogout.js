import { useUserContext } from "./useUserContext";
import Cookies from "universal-cookie";
export const useLogout = () => {
    const { dispatch } = useUserContext();

    const logout = async () => {
        const cookies = new Cookies();
        cookies.remove('token');
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
        window.open('https://animaxx.vercel.app/logout', '_self');
    }

    return { logout };
}