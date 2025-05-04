import {GoogleLogin} from "@react-oauth/google";
import {useNavigate} from "react-router-dom";
import {saveUser} from "../models/UserModel";
import {processGoogleLogin} from "../models/loginAuthModel";

/*
Basic LoginView that only contains a Google Login button
 */
const LoginView = () => {
    const navigate = useNavigate();

    //If no errors, save user into localstorage and refresh home page after a slight delay to allow database time to retrieve data
    const handleLoginSuccess = (credentialResponse) => {
        const user = processGoogleLogin(credentialResponse);
        if (user) {
            saveUser(user);
            setTimeout(() => {
                window.location.reload();
            }, 1000); // 2 seconds
            navigate('/home');

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