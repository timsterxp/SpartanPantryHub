import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../models/UserModel";
import { processGoogleLogin } from "../models/loginAuthModel";


const LoginView = () => {
    const navigate = useNavigate();

    const handleLoginSuccess = (credentialResponse) => {
        const user = processGoogleLogin(credentialResponse);
        if (user) {
            saveUser(user);
            navigate("/home");
        }
    };

    return (
        <div>
            <h2>Login Page</h2>
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={() => console.log("Login Failed")}
            />
        </div>
    );
};

export default LoginView;