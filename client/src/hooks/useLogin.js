    import { useUserContext } from "./useUserContext";
    import { useState } from "react";
    import axios from "axios";
    import Cookies from "universal-cookie";
    import { useNavigate } from "react-router-dom";
    export const useLogin = () => {
        const nav = useNavigate();
        const [error, setError] = useState("");
        const [loading, setLoading] = useState(false);
        const { state, dispatch } = useUserContext();

        const login = async ({email, password}) => {
            const cookies = new Cookies();
            setLoading(true);
            setError(null);
            const user = {
                email,
                password,
            };

            const response = await axios.post("http://localhost:3000/auth/login", user);
            const data = await response.data;
            if (response.status === 200) {
                dispatch({ type: "LOGIN", payload: data });
                setLoading(false);
                cookies.set("token", data.token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
                localStorage.setItem("user", JSON.stringify(data.user));
                nav('/search')
            } else {
                setError(data.message);
                setLoading(false);

            }
        }

        return { login, error, loading };

    }

    