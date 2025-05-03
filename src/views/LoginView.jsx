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
            setTimeout(() => {
                window.location.reload();
            }, 2000); // 2 seconds
           navigate('/home');

        }

    };

    const retrieveUser = async (name, email) => {
        try {
            const res = await fetch("http://localhost:5000/api/user-check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email }),
            });

            const data = await res.json();
            return data;
        } catch (error) {
            console.error("❌ Error retrieving user:", error);
            return null;
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